const path     = require('path')
const fs       = require('fs')
const basename = path.basename(__filename)

/**
 * Example: matrixify([1,2,3,4,5,6,7,8], 3) === [[1,2,3][4,5,6][7,8]]
 * 
 * @param arr 
 * @param dimen 
 */
function matrixify(arr, dimen){
    let matrix = [], i, k;

    for(i=0, k=-1; i < arr.length; i++){
        if(i % dimen === 0){
            k++;
            matrix[k] = [];
        }
        matrix[k].push(arr[i]);
    }

    return matrix;
}

/**
 * Example: 91 145 98 09 === +998911459809
 * Example: 91 145 98 9 === false
 * Example: +998 91145 98 09 === +998911459809
 * Example: a91 145 98 09 === false
 * 
 * @param @nullable phoneNumber (String)
 */
async function phoneNumberDetector(phoneNumber){
    let phone = phoneNumber.replace(/[\+ \-]/g, '')
    phone = phone.match(/^[0-9+]*$/gm)
    
    if(!phone){
        return false
    }

    phone = phone[0]

    if(phone.length == 12){
        if(phone.substr(0, 3) === '998'){
            phone = '+' + phone
            return phone
        }
    }
    
    if(phone.length == 9){
        phone = '+998' + phone
        return phone
    }

    return false
}

function parseToHtml(message){
    let newHtmlText = ``
    let caret = 0
    const entities = message.entities
    
    if(!entities)
        return message.text

    entities.forEach(entity => {
        switch(entity.type){
            case `bold`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<b>`+ message.text.substring(entity.offset, entity.offset + entity.length) + `</b>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
            case `italic`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<i>`+ message.text.substring(entity.offset, entity.offset + entity.length) + `</i>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
            case `underline`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<u>`+ message.text.substring(entity.offset, entity.offset + entity.length) + `</u>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
            case `strikethrough`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<s>`+ message.text.substring(entity.offset, entity.offset + entity.length) + `</s>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
            case `code`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<code>`+ message.text.substring(entity.offset, entity.offset + entity.length) + `</code>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
            case `text_link`: {
                if(caret < entity.offset){
                    newHtmlText += message.text.substring(caret, entity.offset)
                    caret = entity.offset + entity.length
                }
                const text = `<a href="${entity.url}">`+message.text.substring(entity.offset, entity.offset + entity.length)+`</a>`
                caret = entity.offset + entity.length
                newHtmlText += text
                break
            }
        }
    })

    newHtmlText += message.text.substring(caret, message.text.length)

    return newHtmlText
}

function isValidTime(time){
    
    if(time.day > 31 || time.day < 1){
        return false
    }

    if(time.hour > 23 || time.hour < 0){
        return false
    }

    if(time.minute > 59 || time.minute < 0){
        return false
    }

    const currYear = new Date().getFullYear()
    if(time.year == currYear){
        if(time.month > 0 && time.month < 13){
            const currMonth = new Date().getMonth() + 1
            if(time.month == currMonth){
                const currDay = new Date().getDate()
                if(time.day == currDay){
                    const currHour = new Date().getHours()
                    
                    if(time.hour == currHour){
                        const currMinute = new Date().getMinutes()
                        
                        if(time.minute == currMinute){
                            return false
                        }
                        
                        if(time.minute > currMinute){
                            return true
                        }

                        return false
                    }
                    
                    if(time.hour > currHour){
                        return true
                    }

                    return false
                }
                if(time.day > currDay){
                    return true
                }

                return false
            }
            if(time.month > currMonth){
                return true
            }

            return false
        }

        return false
    } else if(time.year == currYear+1){
        return true
    }

    return false
}

/**
 * Example: `02  .12 . 2020  22   :  04` => `02.12.2020 22:04`
 * Example: 03..12.2020 23:02 => false
 */
function makeTime(text){
    let day, month, year, hour, minute
    if(text.split(`.`)[0]){
        day = clearSpace(text.split(`.`)[0])
    } else {
        return false
    }

    if(text.split(`.`)[1]){
        month = clearSpace(text.split(`.`)[1])
    } else {
        return false
    }

    if(text.split(`.`)[2]){
        year = clearSpace(text.split(`.`)[2]).substring(0, 4)
    } else {
        return false
    }

    if(text.split(`:`)[0]){
        let anonymString = clearSpace(text.split(`:`)[0])
        hour = anonymString.substring(anonymString.length - 2)
        if(text.split(`:`)[1]){
            minute = clearSpace(text.split(`:`)[1])
        } else {
            return false
        }
    } else {
        return false
    }


    return {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute
    }
}

function getCurrentDate(){
    const currYear = new Date().getFullYear()
    const currMonth = new Date().getMonth() + 1
    const currDay = new Date().getDate()

    return currDay +`.`+ currMonth +`.`+ currYear
}
/**
 * @param {*} cur It's always equals to 0! 
 * @param {*} arrFns { callback: anonym function with no params, duration: delay time before this function}
 */
function slowDownFuncDuration(cur=0, arrFns){
    if(arrFns[cur]){
        const timer = setInterval(()=> {
            arrFns[cur].callback()
            clearInterval(timer)
            slowDownFuncDuration(++cur, arrFns)
        }, arrFns[cur].duration)
    }
}

async function isAdmin(ctx){
    const user_id = ctx.from.id
    const admins = await ctx.getChatAdministrators()
    let   is_admin = false

    for(let i=0; i < admins.length; i++){
        const admin = admins[i]
        if(admin.user.id == user_id){
            is_admin = true
        }
    }
    
    return is_admin
}

async function isBotAdminHere(ctx){
    const admins = await ctx.getChatAdministrators()
    const bot_username = ctx.botInfo.username

    for(let i=0; i < admins.length; i++){
        if(admins[i].user.username == bot_username){
            return true
        }
    }

    return false
}

// 0-> hech qanday permission berilmadi, 1->permission berildi lekin barchasi emas, 2->barchasi berildi
async function givenPermissionsStatus(ctx){
    const admins = await ctx.getChatAdministrators()
    let   hasPermissionStatus = 0
    const botId = ctx.botInfo.id

    for(let i=0; i < admins.length; i++){
        const admin = admins[i]
        if(admin.user.id == botId){
            const self = admins[i]
            if( self.can_delete_messages  && self.can_pin_messages && 
                self.can_promote_members && self.can_restrict_members
                ){
                hasPermissionStatus = 2
            } else if( 
                    self.can_delete_messages  || self.can_pin_messages || 
                    self.can_promote_members || self.can_restrict_members
                ){
                    hasPermissionStatus = 1
            }
        }
    }

    return hasPermissionStatus
}

async function isThereEntity(message, entityType){
    const entities = message.entities
    
    if(entities != undefined && entities.length != 0){
        for(let i=0; i < entities.length; i++){
            if(entities[i].type == entityType){
                return true
            }
        }
    }
    
    return false
}

module.exports = {
    matrixify, phoneNumberDetector, parseToHtml, getCurrentDate, slowDownFuncDuration, isAdmin, isBotAdminHere, givenPermissionsStatus, isThereEntity
}