const mongoose = require('mongoose')

const connect = mongoose.createConnection(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k7qck.mongodb.net/k14shop?retryWrites=true&w=majority`
)

connect.on('connected', () => {
	console.log('-- Mongodb::connected --')
})
connect.on('disconnected', () => {
	console.log('-- Mongodb::disconnected --')
})
connect.on('error', () => {
	console.log('-- Mongodb::error connect --')
})

process.on('SIGINT', async () => {
	await connect.close()
	process.exit(0)
})


module.exports = connect