import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './Config/DB.js'
import productRoutes from './routes/product.routes.js';

const PORT = process.env.PORT
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
    res.send('server is ready');
});

app.listen(PORT, () => {
    connectDB();
    console.log('server started at http://localhost:'+PORT);
});
