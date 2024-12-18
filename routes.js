const express = require('express')

const recipeController = require('./controller/recipeController')
const testimonialController = require('./controller/testimonialController')
const userController = require('./controller/userController')
const jwt = require('./middleware/jwtMiddleware')
const downloadController = require('./controller/downloadController')
const savedRecipeController = require('./controller/savedRecipeController')


const routes = new express.Router()

//path to get all recipes

routes.get('/all-recipe', recipeController.getAllRecipeController)

//path to add testimonial
routes.post('/add-testimonial',testimonialController.addTestimonialController)

//path to register
routes.post('/register',userController.registerController)

//path to login
routes.post('/login',userController.loginController)

//path to view recipe / get a particular recipe
routes.get('/view-recipe/:id', jwt,recipeController.viewrecipeController)

//path to download recipe
routes.post('/download-recipe/:id',jwt,downloadController.addDownloadController)

// path to saved recipe
routes.post('/save-recipe',jwt,savedRecipeController.addsavedRecipesController)

//path to get all saved recipe
routes.get('/get-allsaved-recipes',jwt,savedRecipeController.getSavedRecipeController)

//path to delete a saved recipe
routes.delete('/delete-saved-recipe/:id',jwt,savedRecipeController.removeSavedRecipeController)

// path to get userDownload recipe
routes.get('/user-downloads',jwt,downloadController.getUserDownloadListController)

// path to edit
routes.post('/user/edit',jwt,userController.editUserController)

// route to get all users
routes.get('/all-users',jwt,userController.getAllUsersController)

// path to get all doownload list
routes.get('/download-list',jwt,downloadController.getAllDownloadListController)

// get all testimonials
routes.get('/all-testimonials',jwt,testimonialController.getAllFeedBackController)

// path to edit the status of testimonial
routes.get('/edit-testimonial/:id',jwt,testimonialController.editAllTestimonialController)

// path to get all approved testimonials
routes.get('/approved-testimonials',testimonialController.getAllApprovedTestimonials)

// path to add a new Recipe
routes.post('/add-recipe',jwt,recipeController.addRecipeController)

// path to edit/update a Recipe
routes.put('/recipe/edit/:id',jwt,recipeController.updateRecipeController)

// path to delete Recipe
routes.delete('/recipe/delete/:id',jwt,recipeController.deleteRecipeController)

module.exports = routes