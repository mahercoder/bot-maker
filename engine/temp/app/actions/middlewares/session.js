const { session } = require('telegraf')

module.exports = session({
    getSessionKey: (ctx) => {
      if (ctx.from && ctx.chat) {
        return `${ctx.from.id}:${ctx.chat.id}`
      } else if (ctx.from) {
        return `${ctx.from.id}:${ctx.from.id}`
      }
      return null
    }
})