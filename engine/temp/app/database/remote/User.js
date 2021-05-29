const { logger } = require('../../utils')
const { User } = require('../models')

async function create(object){
    try {
        const newUser = await User.create(object)
        return newUser.dataValues
    } catch (err) {
        
        if(err.name == `SequelizeUniqueConstraintError`){
            logger.saveError('This user was already exists!')
        } else {
           logger.saveError(err)
        }

        return null
    }
}

async function get(id){
    const user = await User.findOne({where: {id: id}})
    if(user){
        return user.dataValues
    } else {
        return null
    }
}

async function update(id, object){
    try{
        const newUser = await User.update(object, {where: {id: id}})
        if(newUser){
            return newUser.dataValues
        } else {
            return null
        }
    } catch(err) {
        logger.saveError(err)
        return null
    }
}

async function destroy(id){
    try{
        await User.destroy({where: {id: id}})
    } catch(err) {
        logger.saveError(err)
        return null
    }
}

module.exports = {
    create, get, update, destroy
}