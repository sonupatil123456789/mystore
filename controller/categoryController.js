const categoryModel = require("../models/catogaryModel");


// creatin a category 
exports.creatCategory = async (req,res,next) => {
    try {
        const category = await categoryModel.create(req.body);
        res.status(200).json({
            success: true,
            message: `New category added`,
            category,
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
exports.fetchAllCategorys = async (req,res,next) => {
    try {
        const categorys = await categoryModel.find()
        res.status(200).json({
            success: true,
            message: `List of all category`,
            categorys,
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
exports.fetchSingleCategorys = async (req,res,next) => {
    const {id} = req.params;
    try {
        const categorys = await categoryModel.findOne({_id:id})
        if (!categorys) {
            res.status(400).json({
                success: false,
                message: `No such category`,
            });
        }
        res.status(200).json({
            success: true,
            message: `One category found`,
            categorys,
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

