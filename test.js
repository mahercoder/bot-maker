try {
	mod = require('./scenarios')
} catch (err) {
	console.log(err.code === `MODULE_NOT_FOUND`)
};
console.log(mod);
const scenario = require('./scenario');
scenario.name = "bot-temp";
for (let item in scenario) {
	console.log(scenario[item])
}
let myArray = [
	[1, 2],
	[3, 4, 5],
	[6, 7, 8, 9], 45, 87
];
let myNewArray = [].concat.apply([], myArray)
// let myNewArray = myArray.reduce(function(prev, curr) {
//      return prev.concat(curr);
// });

console.log(myNewArray);
// *************************************************
let handler = {}

// [Tanlovlar]
handler.contests = function(ctx){

}

// [Loyiha yuborish]
handler.send_project = function(ctx){
     
}

// [English for science]
handler.english_for_science = function(ctx){
     
}

// [G'oya berish]
handler.send_idea = function(ctx){
     
}

// [Biz bilan bog'lanish]
handler.contact_us = function(ctx){
     ctx.deleteMessage()
     ctx.scene.enter('contact_us')
}

// [Bot haqida]
handler.about = function(ctx){
     ctx.deleteMessage()
     ctx.scene.enter('about')
}

module.exports = handler
//*************************************************
// *************************************************

const { BaseScene } = require('telegraf')
const { callback, getKeyboard } = require('./keyboards')
const Handler = require('./handler')

const scene = new BaseScene('home')
    .enter(async ctx => {        
        getKeyboard(ctx).then( async extra => {
            const photo = ctx.i18n.t(`scenes.home.image`)
            
            extra.caption = ctx.i18n.t(`scenes.home.header`)
            ctx.replyWithPhoto(photo, extra)
        })
    })
    .action(/.+/, async ctx => {
        const action = ctx.callbackQuery.data.split('--')[0]
        switch(action){
            case callback.contact_us: {
                Handler.contact_us(ctx)
                break
            }

            case callback.about: {
                Handler.about(ctx)
                break
            }
        }
    })

module.exports = scene