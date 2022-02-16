const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});

module.exports = app;
