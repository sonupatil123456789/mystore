const brandsModel = require("../models/brandModel");


// creatin a category 
exports.creatBrands = async (req,res,next) => {
    try {
        const brands = await brandsModel.create(req.body);
        res.status(200).json({
            success: true,
            message: `New brands added`,
            brands,
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


// featching all category 
exports.fetchAllBrands = async (req,res,next) => {
    try {
        const brands = await brandsModel.find()
        res.status(200).json({
            success: true,
            message: `List of all category`,
            brands,
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


//  featching single categorys
exports.fetchSingleBrand = async (req,res,next) => {
    const {id} = req.params;
    try {
        const brands = await brandsModel.findOne({_id:id})
        if (!brands) {
            res.status(400).json({
                success: false,
                message: `No such brands`,
            });
        }
        res.status(200).json({
            success: true,
            message: `One brands found`,
            brands,
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