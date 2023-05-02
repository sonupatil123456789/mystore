const productModel = require("../models/productModel");

exports.creatProduct = async (req,res,next) => {
    try {
        // const {  title, discription, color, size ,price, rating, stock, brand, category, thumbnail,productImages} =req.body;
        const product = await productModel.create(req.body);
        res.status(200).json({
            success: true,
            message: `New product created`,
            product,
        });
        
    } catch (ex) {
        console.log(ex)
        res.status(400).json({
            success: false,
            message: `Some error occured`,
            ex
        });
    }
}

exports.fetchAllProducts = async (req,res,next) => {
    try {
        const products = await productModel.find()
        res.status(200).json({
            success: true,
            message: `List of all products`,
            products,
        });
    } catch (ex) {
        console.log(ex)
        res.status(400).json({
            success: false,
            message: `Some error occured`,
            ex
        });
    }
}

exports.fetchAllProductsByCategory = async (req,res,next) => {
    try {
        const{categoryId}= req.params
        const productsByCategory = await productModel.find({category:categoryId}).populate("category");
        if (!productsByCategory) {
            res.status(400).json({
                success: false,
                message: `No such products with this category found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `List of all category products`,
            productsByCategory,
        });
    } catch (ex) {
        console.log(ex)
        res.status(400).json({
            success: false,
            message: `Some error occured`,
            ex
        });
    }
}

exports.updateProductInfo = async (req,res,next) => {
    try {
        const { id, title, discription, color, size ,price, rating, stock, brand, category, thumbnail,productImages} =req.body;

        const updatedproduct = await productModel.findOneAndUpdate(
            { _id: id },
            { title,
                discription,
                price,
                rating,
                stock,
                brand,
                category,
                thumbnail,
              $push: {
                  color:color,
                  size:size,
                  productImages:productImages
              },
            },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            message: ` Product is is updated  (U)`,
            updatedproduct,
          });

    } catch (ex) {
        console.log(ex)
        res.status(400).json({
            success: false,
            message: `Some error occured`,
            ex
        });
    }
}


