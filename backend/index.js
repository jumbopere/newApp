import express from 'express';
import cors from 'cors';
import {json, urlencoded} from 'body-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {userRoute, productRoute, cartRoute, orderRoute} from './routes/index.js';


dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());

mongoose.connect(process.env.DB_URL).then(() => console.log("Database is connected")).catch((err) => {
    console.log(err)
})
app.use('/users', userRoute(express));
app.use('/products', productRoute(express));
app.use('/carts', cartRoute(express));
app.use('/orders', orderRoute(express));
app.get("/api/test", (req, res) => {
    res.send("test")
})

app.listen(5000, () => {
    console.log('server running on ' + PORT)
});

module.exports = app
