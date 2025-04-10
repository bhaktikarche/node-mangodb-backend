const express = require('express')
const router = express.Router()
const Product = require('../Models/Product.js');


router.post('/add', async (req, res) => {
    try {
        const { productName, productPrice, productUnit, productDescription } = req.body;
        const productExist = await Product.findOne({ productName });
        if (productExist) {
            return res.json({
                status: false,
                message: 'Product already exists'
            });
        }

        const productObj = new Product({ productName, productPrice, productUnit, productDescription  });
        await productObj.save();
            res.json({
            status: true,
            message: 'Product added successfully'
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});


router.get('/get',async(req,res)=>{
    try{
        const results = await Product.find()
        res.json({
            status:true,
            message:results
        })
    }catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
})



module.exports = router;