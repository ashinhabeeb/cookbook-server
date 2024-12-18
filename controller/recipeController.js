const recipes = require("../model/recipesModel")


exports.getAllRecipeController = async (req, res) => {
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(401).json(error)
    }
}

// view recipe

exports.viewrecipeController = async (req, res) => {
    const { id } = req.params

    try {

        const existingrecipe = await recipes.findOne({ _id: id })
        res.status(200).json(existingrecipe)

    } catch (error) {
        res.status(401).json(error)
    }
}

// add a new recipe

exports.addRecipeController = async (req, res) => {

    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, cuisine, difficulty, caloriesPerServing, image, mealType } = req.body

    try {
        const existingRecipe = await recipes.findOne({ name })
        if (existingRecipe) {
            res.status(406).json('Recipe already in out Collectioin!!')
        }
        else {
            const newRecipe = new recipes({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, cuisine, difficulty, caloriesPerServing, image, mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }


}

// update Recipe

exports.updateRecipeController = async (req, res) => {

    const { id } = req.params

    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, cuisine, difficulty, caloriesPerServing, image, mealType } = req.body

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({ _id: id }, { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, cuisine, difficulty, caloriesPerServing, image, mealType }, { new: true })
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete Recipe
exports.deleteRecipeController = async (req,res)=>{
   const {id} = req.params
   
   try {
    const removeRecipe = await recipes.findByIdAndDelete({_id:id})
    res.status(200).json(removeRecipe)
   } catch (error) {
    res.status(401).json(error)
   }
}

