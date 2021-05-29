const { BaseScene } = require('telegraf')
const { callback, getKeyboard } = require('./keyboards')

const scene = new BaseScene('greeting')
    .enter(async ctx => {
        const text = ctx.i18n.t(`scenes.greeting.header`)
        const keyboard = await getKeyboard(ctx)
        await ctx.reply(text, keyboard)
    })
    .action(callback.hi, async ctx => {
        const text = ctx.i18n.t(`scenes.greeting.hi`)
        await ctx.deleteMessage()
        await ctx.reply(text)
        await ctx.scene.leave()
    })
    .leave(async ctx => {
        console.log(`Exited from greeting!`)
    })

module.exports = scene