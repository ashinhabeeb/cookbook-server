const savedrecipes = require("../model/savedRecipe")


exports.addsavedRecipesController = async(req,res)=>{
    const {id, name, cuisine, image} = req.body

    const userId = req.payload

    try {
        const existingRecipe = await savedrecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json('recipe already in your collection')
        }
        else{
            const newrecipe = new savedrecipes({
                recipeId:id,
                recipename:name,
                recipecuisine:cuisine,
                recipeImage:image,
                userId
            })
            await newrecipe.save()
            res.status(200).json(newrecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getSavedRecipeController = async(req,res)=>{

    const userId = req.payload


    try {
        const allsavedRecipe = await savedrecipes.find({userId})
        res.status(200).json(allsavedRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.removeSavedRecipeController = async(req,res)=>{
    const {id} = req.params

    try {
        await savedrecipes.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
    } catch (error) {
        res.status(401).json(error)
    }
}