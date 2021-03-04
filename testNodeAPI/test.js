const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
 console.log("headers",req.headers)
  delete require.cache['/ushurapp/testfiles/test.js']
  const func = require('/ushurapp/testfiles/test.js')
  const resp =  func({a:1,b:2})
  res.send('Hello World! '+resp)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
