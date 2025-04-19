const EventEmitter = require('events')
const eventsEmitter = new EventEmitter()

eventsEmitter.on('start', () =>{
    console.log("Durante")
})

console.log("antes")

eventsEmitter.emit('start')

console.log('Depois')