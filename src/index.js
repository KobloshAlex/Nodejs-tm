const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routes/userRoute')
const taskRouter = require('./routes/taskRouter')
require('./db/mongoose')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('start on port ' + port)
})