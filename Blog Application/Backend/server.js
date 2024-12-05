const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use('/api/users', require('./routes/userRoute'));
app.use('/api/posts', require('./routes/blogRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
