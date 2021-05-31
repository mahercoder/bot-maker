const path = require('path')
const TelegrafI18n = require('telegraf-i18n')

const i18n = new TelegrafI18n({
    directory: path.resolve(__dirname, '../../locales'),
    defaultLanguage: 'uz',
    sessionName: 'session',
    useSession: true,
    templateData: {
      pluralize: TelegrafI18n.pluralize
    }
})

module.exports = i18n.middleware()