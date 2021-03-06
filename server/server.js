require('dotenv').config()

const express = require('express')
const cors = require('cors')
const figlet = require('figlet')

// App init
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listenning on port ${PORT}`)
  figlet('Agile Trello', (_, data) => console.log(data))
})

