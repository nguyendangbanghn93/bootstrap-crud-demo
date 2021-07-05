const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const studentRouter = require('./routers/student')
const connectDB = async () => {
	try {
		await mongoose.connect(
			' mongodb+srv://bang:1234@cluster0.5yppd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)
		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/students', studentRouter)
// app.use('/api/posts', postRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))