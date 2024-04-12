const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const headphonesArray = require('./db/headphones-list.json')
const cart = require('./db/cart.json')
const path = require('path')
const fs = require('fs')

const PORT = 8000
const DB = path.join('db', 'cart.json')

let sent = false;

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/headphones/get-list', (req, res) => {
    res.status(200)
    res.send(headphonesArray)
  })

app.get('/cart/get', (req, res)=>{
    res.status(200)
    res.send(cart)
})

app.post('/cart/add', (req, res)=>{
  const postData = req.body
  res.setHeader = function(name, value) {
    if (!sent) {
      res.setHeader(name, value);
    }
  }
  sent = true;
  if(!postData){
    return res.status(400).send('Bad request')
  }

  fs.readFile(DB, (err, data)=> {
    if (err) throw err;

    try {
      let cartData = JSON.stringify([ ...JSON.parse(data), postData])
      fs.writeFile(DB, cartData, (writeErr)=>{
        if (writeErr) {
          return res.status(500).send('Не удалось произвести запись')
        }
        res.status(200).send('Успешно добавлен товар в корзину')
      })
    } catch {
      return res.status(500).send('Не удалось произвести запись')
    }
  })

    res.status(200)
    res.send()
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
  })