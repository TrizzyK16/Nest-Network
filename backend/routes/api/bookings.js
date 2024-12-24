
const express = require('express')
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

//get all bookings by the current user
router.get('/session', requireAuth, async (req, res) => {
    const userId = req.user.id
    const userBookings = await Booking.findAll({
        where: { userId: userId },
        include: [
            {
                model: Spot, 
                attributes: [
                    "id",
                    "ownerId",
                    "address",
                    "city",
                    "state",
                    "country",
                    "lat",
                    "lng",
                    "name",
                    "price"
                ],
                include: [
                    { model: Review, attributes: ['stars'] }, // Include reviews to calculate avgRating
                    { model: SpotImage, attributes: ['url', 'preview'] } // Include spot images
                ]
            }
        ]
    });

    // console.log(userBookings[0].dataValues.Spot.dataValues)

    userBookings.forEach(element => {
        element.dataValues.avgRating = element.dataValues.Spot.dataValues.Reviews.reduce((acc, review) =>{
            acc += review.stars
       
            return acc
        }, 0)/element.dataValues.Spot.dataValues.Reviews.length
        delete element.dataValues.Spot.dataValues.Reviews
    })

    // Find and add the preview image for each spot
    userBookings.forEach(element => {
        const previewImage = element.dataValues.Spot.dataValues.SpotImages.find(image => image.preview === true);
        element.dataValues.Spot.dataValues.previewImage = previewImage.url
        delete element.dataValues.Spot.dataValues.SpotImages;
    });

    //remove avg rating
    userBookings.forEach(element => {
        delete element.dataValues.avgRating
    })

    // Respond with the spots
    return res.json({
        "Bookings": userBookings
    });
})


// Edit a booking
router.put('/:bookingid', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingid; // The booking ID from the URL params
    const {startDate, endDate} = req.body; // This allows us to use startDate and endDate as we need

    if (!startDate || !endDate) {
        // If startDate or endDate are invalid, return an error
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                startDate: "Proper date is required",
                endDate: "Proper date is required"
            }
        });
    }
    
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        // If the booking doesn't exist return a 404 error
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    if (booking.userId !== req.user.id) {
        res.status(401).json({error: "Must be user to edit this booking"});
    }

   if (error.name === 'SequalizeValidationError') {
    return res.status(400).json({
        errors: error.errors.map(err => ({
            message: err.message,
            field: err.path,
        }))
    })
   }

    await booking.update({
        startDate,
        endDate
    });

    return res.json(booking);
});

module.exports = router;