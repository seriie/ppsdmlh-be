const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const port = 9000;

const userRoutes = require('../src/routes/userRoutes');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;