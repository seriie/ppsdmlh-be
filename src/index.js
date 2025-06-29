const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const port = 9000;

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes)
app.use('/users', userRoutes);

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// })

module.exports = app;