import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db.js'
import studentRouter from './routes/studentRouter.js'

dotenv.config()
console.log(process.env.PORT)
connectDB()

const app = express()
 
app.use(express.json())

app.use('/api/students/', studentRouter)

app.use((err, req, res, next) => {
    res.status(404)
    res.json({
        message: err.message,
        stack: process.env.NODE_env === 'production' ? null : err.stack,
    })
})

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

const PORT = process.env.PORT
app.listen(PORT, console.log(`${PORT}`))