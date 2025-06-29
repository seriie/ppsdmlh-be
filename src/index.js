const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const port = 9000;

const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})