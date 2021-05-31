const report = require('./report')
const session = require('./session')
const i18n = require('./i18n')
const stage = require('./stage') 

module.exports = async bot => {

    bot.catch(report)
    bot.use(session)
    bot.use(i18n)
    bot.use(stage)
    
}