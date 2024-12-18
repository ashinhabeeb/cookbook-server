const testimonials = require("../model/testimonialModel")

exports.addTestimonialController = async(req,res)=>{
    const {name,email,message} = req.body

    try {
        const newTestimonial = new testimonials({
            name , email , message
        })
        await newTestimonial.save()
        res.status(200).json(newTestimonial)

    } catch (error) {
        res.status(401).json(error)
    }
}

// get all feedback

exports.getAllFeedBackController = async(req,res)=>{
    try {
        const allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit testimonial status controller

exports.editAllTestimonialController = async(req,res)=>{

    const {id} = req.params
    const status = req.query.status

    try {
        const existingStatus = await testimonials.findById({_id:id})
        existingStatus.status = status
        await existingStatus.save()
        res.status(200).json(existingStatus)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get approved testimonials in home page

exports.getAllApprovedTestimonials = async(req,res)=>{
    try {
        const allApprovedFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    } catch (error) {
        res.status(401).json(error)
    }
}

