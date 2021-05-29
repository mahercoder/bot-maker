const updateTypes = require('./update-types')
const updateSubTypes = require('./update-sub-types')


module.exports = async bot => {

    updateTypes.forEach(async update => {
        if(update.name && update.action){
            bot.on(update.name, update.action)
        }
    })

    updateSubTypes.forEach(async update => {
        if(update.name && update.action){
            bot.on(update.name, update.action)
        }
    })

}