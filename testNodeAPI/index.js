const express = require('express')
const app = express()
const config = require('./config.json')
const port = config.port
app.use(express.json())

const getCustomModules = require('./lib/getCustomModules')
const getCustomModule = require('./lib/getcustomModule')
const uploadCustomModule = require('./lib/uploadCustomModule')

app.get('/customRest/getCustomModules', async (req, res) => {
  const response = await getCustomModules()
  res.send(response)
})


app.get('/customRest/getcustomModule/:id', async (req, res) => {
  const response = await getCustomModule(req.params.id)
  res.send(response)
})


app.post('/customRest/uploadCustomModule/:id', async (req, res) => {
  const response = {
  	"success" : await uploadCustomModule(req.params.id,req.body)
  }
  res.send(response)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
