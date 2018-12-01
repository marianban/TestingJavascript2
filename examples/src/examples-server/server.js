import express from 'express';
import axios from 'axios';

export const app = express();

app.get('/hello', async function(req, res) {
  res.send('Hello');
});

app.get('/async', async function(req, res) {
  const { data } = await axios.get('https://api.app.com/resource');
  res.send(data);
});

// app.listen(3000);
