const { Extra } = require('telegraf')

const callback = {
    hi: `greeting.hi`
}

async function getKeyboard(ctx){
    const hi = ctx.i18n.t(`scenes.greeting.hi`)
    
    return Extra.HTML().markup((m) => m.inlineKeyboard([
        m.callbackButton(hi, callback.hi)
    ]))
}

module.exports = {
    callback,
    getKeyboard
}