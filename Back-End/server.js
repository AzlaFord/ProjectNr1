import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './Config/DB.js'

dotenv.config()

const app = express()

app.post('/products',async(req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.imagine){
        return res.status(400).json({ success:false,message: "please provide all data"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success:true , data: newProduct})
    } catch(error){
        console.error("Error in create product " , error.message)
        res.status(500).json({success:false,message: "server Error"})
    }
})

app.get("/",(req,res) =>{
    res.send('server is ready')
})

app.listen(5000,()=>{
    connectDB()
    console.log('server started at http://localhost:5000')
})
