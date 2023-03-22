const express = require('express')
const path = require('path')
const multer  = require('multer')
const {mergePdfs} = require('./merge')
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('pdfs', 12), async (req, res, next) =>{
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(res.files)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data: req.files})
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})