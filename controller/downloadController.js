
const downloads = require('../model/downloadModel')

exports.addDownloadController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload

    const {name,cuisine,image,} = req.body

    console.log(id,name,image,cuisine)
    console.log(userId)

    try {
        const existingRecipe = await downloads.findOne({recipeId:id})
        if (existingRecipe) {
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            const newRecipe = new downloads({
                recipeId:id,
                recipename:name,
                recipecuisine:cuisine,
                count:1,
                recipeImage:image,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get download recipes

exports.getUserDownloadListController = async(req,res)=>{
    console.log('inside getUserDownloadListController');
// get userId from jwt middleware
const recipeId = req.params

// find document with userId from model
try {
    const allUserDownloads = await downloads.find({recipeId})
    res.status(200).json(allUserDownloads)
    console.log(allUserDownloads)
} catch (error) {
    res.status(401).json(error)
}
}

// get all download recipes ist
exports.getAllDownloadListController = async(req,res)=>{
    console.log('inside getAllDownloadListController')

// find document with userId from model
try {
    const allDownloads = await downloads.find()
    res.status(200).json(allDownloads)
    console.log(allDownloads)
} catch (error) {
    res.status(401).json(error)
}
}