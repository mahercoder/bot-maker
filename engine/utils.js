const fs = require('fs')
const path = require('path')

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

    return localeJson
}

// function makeScenes(scenesPath, localesPath, sceneList){
//     for(let i=0; i < sceneList.length; i++){
//         const log = makeScene(scenesPath, localesPath, sceneList[i])
//         // console.log(log)
//     }
// }

// const src_package = require(`${path_temp}/package.json`)
// const stream_package = fs.createWriteStream(`${path_root}/package.json`)

// src_package.name = scenario.name
// src_package.version = scenario.version
// src_package.description = scenario.description
// src_package.author = scenario.author
// src_package.license = scenario.license

// stream_package.once('open', (fd) => {     
//      stream_package.write(JSON.stringify(src_package, null, '    '))
//      stream_package.end()
// })

module.exports = {
  copyFolderSync,
  makeScenes
}