import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './Config/DB.js'
import productRoutes from './routes/product.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send('server is ready');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to DB", err);
});
