const ProductCode = require('../models/productCodeModel')

module.exports.findProductCodes = (forAdmin = false) => {
    return ProductCode.find({
        ...(
            forAdmin ? 
            {

            } : 
            {
                active: true
            }
        )
    }).lean()
}