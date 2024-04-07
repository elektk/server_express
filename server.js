const express = require('express')
const app = express()

const PORT = 8000

app.get('/headphones', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const cardInfoTopPicksList = [{
        cardTitle: "Беспроводные наушники №1",
        reviews: 100,
        price:32
    },{
        cardTitle: "Беспроводные наушники №2",
        reviews: 130,
        price:95
    },{
        cardTitle: "Беспроводные наушники №3",
        reviews: 88,
        price:132
    }];
    res.send(cardInfoTopPicksList)
  })

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
  })