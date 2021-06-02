const { Telegraf } = require('telegraf')
const { setupMiddlewares, setupCommands, setupUpdates } = require('./actions')

const bot = new Telegraf(process.env.TOKEN)

/**
 * 1. Global error catcher: report
 * 2. Predefining sessions: session
 * 3. Language balancer: i18n
 * 4. Setup scenes through scenario: stage
 */
setupMiddlewares(bot)

/**
 * Setting up all global commands
 */
setupCommands(bot)

/**
 * Setting up all upate types and sub-update types.
 */
setupUpdates(bot)

/**
 * Starting the bot...
 */
bot.launch().then(() => console.info('Bot is up and running...'))


module.exports = { bot }