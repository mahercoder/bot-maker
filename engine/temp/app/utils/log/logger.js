const fs = require('fs')

// returns: 23:54:06
function getTime(){
  const newTime = new Date()
  let seconds = newTime.getSeconds()
  let minutes = newTime.getMinutes()
  let hour    = newTime.getHours()

  if(seconds < 10) seconds=`0`+seconds
  if(minutes < 10) minutes=`0`+minutes
  if(hour    < 10) hour=`0`+hour

  return `${hour}:${minutes}:${seconds}`
}

// returns: 22.11.2020
function getDate(){
  const newDate = new Date()
  let day = newDate.getDate()
  let month = newDate.getMonth()+1
  let year = newDate.getFullYear()

  if(day < 10) day=`0`+day
  if(month < 10) month=`0`+month
  if(year < 10) year=`0`+year

  return `${day}.${month}.${year}`
}

const saveDebug = (log, file_name) => { 
  const file = __dirname + '/debugs.txt'
  const log_time = `*** ${getDate()} | ${getTime()} ***`
  const err_file_name = `path: ` + file_name
  const full_log = log_time+
                  `\n - Debug> `+ `\n\t` +
                  err_file_name +`\n\t`+
                  `text: `+log+`\n\n`
  fs.appendFileSync(file, full_log)
}

const saveError = (log, file_name) => {
  const file = __dirname + '/errors.txt'
  const log_time = `*** ${getDate()} | ${getTime()} ***`
  const err_file_name = `path: ` + file_name
  const full_log = log_time+
                  `\n - Error> `+ `\n\t` +
                  err_file_name +`\n\t`+
                  `text: `+log+`\n\n`
  fs.appendFileSync(file, full_log)
}

function parseToJSON(obj = {}){ return JSON.stringify(obj, null, 4) }

function log(obj = {}){ console.log(parseToJSON(obj)) }

module.exports = {
  saveDebug,
  saveError,
  parseToJSON,
  log
}