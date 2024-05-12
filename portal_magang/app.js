const express = require('express')
const session = require('express-session')
const sequelizeStore = require('connect-session-sequelize')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const db = require('./config/db')
const adminRouter = require('./router/adminRouter')
const mitraRouter = require('./router/mitraRouter')
const mahasiswaRouter = require('./router/mahasiswaRouter')
const dotenv = require('dotenv')

dotenv.config()

const sessionStore = sequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 3600000 // expire dalam 1 jam apabila tidak ada aktivitas
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

// 
// Middleware untuk menambahkan header 'Access-Control-Allow-Origin'
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     // Anda juga dapat menambahkan header lain yang diperlukan di sini
//     next();
// });

app.use(cookieParser())
app.use(express.json())
app.use(adminRouter)
app.use(mitraRouter)
app.use(mahasiswaRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
})