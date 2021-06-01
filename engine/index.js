const fs = require('fs')
const path = require('path')
const Utils = require('./utils')
const scenario = require('../scenario')

/************** MAKING STRUCTURAL FOLDERS ****************************/
     const path_temp = __dirname + '/temp'

// ./root
     const path_root = path.join(__dirname, `../products/${scenario.name}`)
     fs.mkdirSync(path_root)

// ./root/app
     const path_app = `${path_root}/app`
     fs.mkdirSync(path_app)

// ./root/app/actions
     Utils.copyFolderSync(path_temp+'/app/actions', path_app)

// ./root/app/database
     Utils.copyFolderSync(path_temp+'/app/database', path_app)

// ./root/app/locales
     fs.mkdirSync(`${path_app}/locales`)

// ./root/app/scenes
     const path_app_scenes = `${path_app}/scenes`
     fs.mkdirSync(path_app_scenes)
     Utils.makeScene(`${path_app}/scenes`, `${path_app}/locales`, scenario.scenes[0])
     // Utils.makeScene(`${path_app}/scenes`, `${path_app}/locales`, scenario.scenes[1])

// ./root/app/utils
     Utils.copyFolderSync(path_temp+'/app/utils', path_app)

/*********************************************************************/

/************** MAKING MUST HAVE FILES ******************************/

/*** ./root ***/
     /*** ./root/index.js ***/
          fs.copyFileSync(`${path_temp}/index.js`, `${path_root}/index.js`)

     /*** ./root/.env ***/
          const stream_env = fs.createWriteStream(`${path_root}/.env`)
          stream_env.once('open', (fd) => {
               stream_env.write(`TOKEN=${scenario.token}`)
               stream_env.end()
          })

     /*** ./root/package.json ***/
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
/**************/
/*** ./app ***/

/*************/

/********************************************************************/

