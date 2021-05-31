const { logger } = require('../../utils')

module.exports = err => {
    logger.saveError(`GLOBAL ERROR: ` + err)
}