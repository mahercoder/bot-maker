const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js

function copyFileSync( source, target ) {

    let targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) )
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderSync( source, target ) {
    let files = []

    // Check if folder needs to be created or integrated
    let targetFolder = path.join( target, path.basename( source ) )
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder )
    }

    // Copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source )
        files.forEach( function ( file ) {
            let curSource = path.join( source, file )
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderSync( curSource, targetFolder )
            } else {
                copyFileSync( curSource, targetFolder )
            }
        } );
    }
}

function makeBeauty(filePath){
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err
        const text = beautify(data, { 
            indent_size: 2, 
            space_in_empty_paren: true, 
            indent_with_tabs: true, 
            end_with_newline: true
        })
        fs.writeFileSync(filePath, text)
    })
}

function generateKeyboard(scene){
    let result = `const Extra=require('telegraf/extra');const callback = {`
    let buttons = [].concat.apply([], scene.keyboard)

    for(let i=0; i < buttons.length; i++){
        result += `${buttons[i].inner_name}: '${buttons[i].callback_data}'`
        if(i < buttons.length-1){
            result += ','
        }
    }

    result += '}';
    result += `async function getKeyboard(ctx){let buttons = [];`

    for(let i=0; i < scene.keyboard.length; i++) {
        if(scene.keyboard[i].length){
            let element = `[`
            for(let n=0; n < scene.keyboard[i].length; n++){
                element += `{
                    text: ctx.i18n.t('scenes.${scene.name}.${scene.keyboard[i][n].inner_name}'),
                    callback_data: callback.${scene.keyboard[i][n].inner_name}
                }`
                if(n < scene.keyboard[i].length-1){
                    element += ','
                }
            }
            element += `]`
            result += `buttons.push(${element});`    
        } else {
            result += `buttons.push([{text: ctx.i18n.t('scenes.${scene.name}.${scene.keyboard[i].inner_name}'),callback_data: callback.${scene.keyboard[i].inner_name}}]);`
        }
    }

    result += `return Extra.HTML().markup((m) => m.inlineKeyboard(buttons));} module.exports = {callback,getKeyboard}`
    return result
}

function generateBaseScene(scene){
    let result = `const { BaseScene } = require('telegraf');const { callback, getKeyboard } = require('./keyboard');\nconst Handler = require('./handler');\nconst scene = new BaseScene('${scene.name}').enter(async ctx => {`
    if(scene.extras){
        switch(scene.extras.type){
            case 'image': {
                result += `getKeyboard(ctx).then( async extra => { const url = ctx.i18n.t('scenes.${scene.name}.extras.url'); extra.caption = ctx.i18n.t('scenes.${scene.name}.header'); ctx.replyWithPhoto(url, extra)})`
                break;
            }
            case 'video': {
                result += `getKeyboard(ctx).then( async extra => {const url = ctx.i18n.t('scenes.${scene.name}.extras.url'); extra.caption = ctx.i18n.t('scenes.${scene.name}.header'); ctx.replyWithVideo(url, extra)})`
                break;
            }
        }

    } else {
        result += `getKeyboard(ctx).then( async keyboard => {const text = ctx.i18n.t('scenes.${scene.name}.header');ctx.reply(text, keyboard);})`
    }

    result += `}).action(/.+/, async ctx => {const action = ctx.callbackQuery.data.split('--')[0];switch(action){`
    
    let buttons = [].concat.apply([], scene.keyboard)
    for(let i=0; i < buttons.length; i++){
        result += `case callback.${buttons[i].inner_name}: {Handler.${buttons[i].inner_name}(ctx);break;}`
    }

    result += `}});module.exports = scene`

    return result
}

function generateHandler(scene){
    let result = `let handler = {};`
    
    let buttons = [].concat.apply([], scene.keyboard)

    for(let i=0; i < buttons.length; i++){
        if(buttons[i].go_to){
            result += `handler.${buttons[i].inner_name} = function(ctx){
                ctx.deleteMessage();
                ctx.scene.enter('${buttons[i].go_to}');
            }`            
        } else {
            result += `handler.${buttons[i].inner_name} = function(ctx){
    
            }`
        }
    }

    result += `module.exports = handler`
    
    return result
}

function makeBaseIndex(scenes){
    let result = `module.exports = {`

    for(let i=0; i < scenes.length; i++){
        const scene = scenes[i]
        result += `${scene.name}: require('./${scene.name}')`
        if(i < scenes.length-1){
            result += ','
        }
    }

    result += `}`

    return result
}

function makeScenes(scenesPath, localesPath, scenes){
// Make locale file or apply if it exists
    let localeJson
    try{
        localeJson = require(localesPath + '/uz.json')
    } catch(err) {
        if(err.code === `MODULE_NOT_FOUND`){
            localeJson = {
                language: {
                    name:   "O'zbek",
                    flag: "🇺🇿",
                    code: "uz"
                },
                scenes: {}
            }
        }
    }

    for(let i=0; i < scenes.length; i++){
        let scene = scenes[i]
        let currSceneJson = {}
        
        // Make a folder for each scene
        fs.mkdirSync(scenesPath+'/'+scene.name)

        currSceneJson.header = scene.caption
        if(scene.extras){
            currSceneJson.extras = scene.extras
        }
    
        let buttons = [].concat.apply([], scene.keyboard)
    
        for(let i=0; i < buttons.length; i++){
            currSceneJson[buttons[i].inner_name]=buttons[i].text
        }
    
        localeJson.scenes[scene.name] = currSceneJson
    }

    fs.writeFileSync(localesPath + '/uz.json', JSON.stringify(localeJson, null, '    '))
// *************************************************

// Make scene files
    for(let i=0; i < scenes.length; i++){
        let scene = scenes[i]
        
        const keyboard = generateKeyboard(scene)
        fs.writeFileSync(scenesPath+'/'+scene.name + '/keyboard.js', keyboard)
        makeBeauty(scenesPath+'/'+scene.name + '/keyboard.js')

        const handler = generateHandler(scene)
        fs.writeFileSync(scenesPath+'/'+scene.name + '/handler.js', handler)
        makeBeauty(scenesPath+'/'+scene.name + '/handler.js')
        
        const index = generateBaseScene(scene)
        fs.writeFileSync(scenesPath+'/'+scene.name + '/index.js', index)
        makeBeauty(scenesPath+'/'+scene.name + '/index.js')
    }

    const baseIndex = makeBaseIndex(scenes)
    fs.writeFileSync(scenesPath+'/' + '/index.js', baseIndex)
    makeBeauty(scenesPath+'/' + '/index.js')
}

module.exports = {
    copyFileSync,
    copyFolderSync,
    makeBeauty,
    makeScenes
}