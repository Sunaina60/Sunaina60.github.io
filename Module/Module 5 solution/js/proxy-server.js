const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001; // Choose a port for your proxy server

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sunaina60.github.io'); // Allow all origins (you might want to restrict this in a production environment)
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/categories', async (req, res) => {
  try {
    const response = await axios.get('https://davids-restaurant.herokuapp.com/categories.json');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/menu_items/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const response = await axios.get(`https://davids-restaurant.herokuapp.com/menu_items.json?category=${category}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
