const time = require('./timeformat.js')

const dt = new Date()
console.log(dt)
let newdate = time.dateformat(dt)
console.log(newdate)