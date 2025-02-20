const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./db/db');
const userRouter = require('./routes/user.route');
const eventRouter = require('./routes/event.route');
const adminRouter = require('./routes/admin.route');
const cookieParser = require('cookie-parser');

dbConnect();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', userRouter)
app.use('/event', eventRouter)
app.use('/admin', adminRouter)

module.exports = app;