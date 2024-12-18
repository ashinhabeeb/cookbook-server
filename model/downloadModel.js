//import mongoose

const mongoose = require('mongoose')


const downloadSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    recipename:{
        type:String,
        required:true
    },
    recipecuisine:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    }

})

const downloads = mongoose.model("downloads",downloadSchema)

module.exports = downloads