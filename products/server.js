const express = require('express');
const app = express();
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const bodyParser = require('body-parser');

app.use('/static', express.static('../public'));
app.use(express.static('../public'));

app.get('/', (req, res) => {
  res.sendFile('../public/index.html');
});

let sneakArrTrending = [];
let sneakArrSearch = [];

sneaks.getMostPopular(11, function(err, sneakers) {
  if (err) {
    console.error(err);
    return;
  }

  sneakArrTrending = sneakers.map(sneaker => ({
    shoeName: sneaker.shoeName,
    brand: sneaker.brand,
    retailPrice: sneaker.retailPrice,
    thumbnail: sneaker.thumbnail,
  }));
});

app.get('/products/trending', (req, res) => {
  res.json(sneakArrTrending);
});

app.use(bodyParser.json());

app.post('/products/search', (req, res) => {
  const value = req.body.value;

  sneaks.getProducts(`${value}`, 8, function(err, products){
    if (err) {
      console.error(err);
      return;
    }

    sneakArrSearch = products.map(sneaker => ({
      shoeName: sneaker.shoeName,
      brand: sneaker.brand,
      retailPrice: sneaker.retailPrice,
      thumbnail: sneaker.thumbnail,
    }));

    res.json(sneakArrSearch);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
