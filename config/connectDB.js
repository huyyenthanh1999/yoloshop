// connect to database
const mongoose = require('mongoose')

async function connectDB() {
	await mongoose.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k7qck.mongodb.net/k14shop?retryWrites=true&w=majority`
	)
	// await mongoose.connect('mongodb://localhost/my_database')
}

connectDB()
