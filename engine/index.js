const fs = require('fs')
const path = require('path')
const Utils = require('./utils')
const scenario = require('../scenario')

/************** MAKING STRUCTURAL FOLDERS ****************************/
const path_temp = './temp'

// ./root
const path_root = `../products/${scenario.name}`
fs.mkdirSync(path_root)

// ./root/app
const path_app = `${path_root}/app`
fs.mkdirSync(path_app)

// ./root/app/actions
const path_app_actions = `${path_app}/actions`
Utils.copyFolderSync(path.join(__dirname, '/temp/app/actions'), path.join(__dirname, path_app))

// ./root/app/database
const path_app_database = `${path_app}/database`
Utils.copyFolderSync(path.join(__dirname, '/temp/app/actions'), path.join(__dirname, path_app))
fs.mkdirSync(path_app_database)

// ./root/app/locales
const path_app_locales = `${path_app}/locales`
fs.mkdirSync(path_app_locales)

// ./root/app/scenes
const path_app_scenes = `${path_app}/scenes`
fs.mkdirSync(path_app_scenes)

// ./root/app/utils
const path_app_utils = `${path_app}/utils`
fs.mkdirSync(path_app_utils)

/*********************************************************************/

/************** MAKING MUST HAVE FILES ******************************/

// ./root/index.js
fs.copyFileSync(`${path_temp}/index.js`, `${path_root}/index.js`)

// ./root/.env
const stream_env = fs.createWriteStream(`${path_root}/.env`)
stream_env.once('open', (fd) => {
     stream_env.write(`TOKEN=${scenario.token}`)
     stream_env.end()
})

// ./root/package.json
const src_package = require(`${path_temp}/package.json`)
const stream_package = fs.createWriteStream(`${path_root}/package.json`)

src_package.name = scenario.name
src_package.version = scenario.version
src_package.description = scenario.description
src_package.author = scenario.author
src_package.license = scenario.license

stream_package.once('open', (fd) => {     
     stream_package.write(JSON.stringify(src_package, null, '    '))
     stream_package.end()
})

// ./root/app/actions
// fs.copy(path_app_actions)
// fs.mkdirSync(`${path_app_actions}/commands`)
// fs.mkdirSync(`${path_app_actions}/middlewares`)
// fs.mkdirSync(`${path_app_actions}/updates`)

/********************************************************************/

