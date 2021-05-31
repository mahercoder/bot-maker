const { Stage } = require('telegraf')
const scenes = require('../../scenes')
const stage = new Stage(Object.keys(scenes).map(s => scenes[s]))

module.exports = stage.middleware()