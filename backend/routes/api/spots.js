// backend/routes/api/spots.js
const express = require('express')
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    // Map the spots to remove unnecessary fields and structure the response
    const formattedSpots = spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.avgRating,
        previewImage: spot.previewImage
    }))
    return res.json({
        Spots: formattedSpots
    });
})


//Create a spot
router.post('/', requireAuth, (req, res) => {

    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    // Validate required fields
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new spot
    Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
        .then(newSpot => {
            // Successfully created the spot
            return res.status(201).json(newSpot);
        })
        .catch(error => {
            // Error occurred during spot creation
            console.error(error); // For debugging purposes
            return res.status(500).json({ error: 'An error occurred while creating the spot' });
        });
});

//EDIT A SPOT
router.put("/:spotId", requireAuth, async (req, res) => {
    const spotId = req.params.spotId;  // The spot ID from the URL params
    const { address, city, state, country, lat, lng, name, description, price } = req.body;  // Destructuring from the request body

    // Ensure all fields are provided and valid
    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude must be within -90 and 90",
                lng: "Longitude must be within -180 and 180",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day must be a positive number",
            },
        })
    }

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot not found",
        });
    }

    if(spot.ownerId !== req.user.id){
        res.status(401).json({error: "Must be owner to edit this spot"})
    }


    await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    return res.json(spot)
});

//Delete a spot by id
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;  // The spot ID from the URL params
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }

    if(spot.ownerId !== req.user.id){
        res.status(401).json({error: "Must be owner to delete this spot"})
    }

    spot.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })
})

//Add an image to a spot based on spot id
router.post('/:spotId/images', requireAuth, async (req, res)=> {
    const spotId = req.params.spotId;  // The spot ID from the URL params
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }

    if(spot.ownerId !== req.user.id){
        res.status(401).json({error: "Must be owner to edit this spot"})
    }

   const spotImage = await SpotImage.create({
        spotId: spot.id,
        url: "image url",
        preview: true
    })

    res.status(201).json({
        "id": spotImage.id,
        "url": spotImage.url,
        "preview": spotImage.preview
    })
})

//get all spots owned by the current user
router.get('/session', requireAuth, async (req, res) => {
    const userId = req.user.id
    const userSpots = await Spot.findAll({
        where: { ownerId: userId },
        include: [{model: Review}, {model: SpotImage}],
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
            "description",
            "price",
            "createdAt",
            "updatedAt",
        ],
    });

    userSpots.forEach(element => {
        element.dataValues.avgRating = element.dataValues.Reviews.reduce((acc, review) =>{
            acc += review.stars
       
            return acc
        }, 0)/element.dataValues.Reviews.length
        delete element.dataValues.Reviews
    })

    // Find and add the preview image for each spot
    userSpots.forEach(element => {
        const previewImage = element.SpotImages.find(image => image.preview === true);
        element.dataValues.previewImage = previewImage.url
        delete element.dataValues.SpotImages;
    });

    // Respond with the spots
    return res.json({
        "Spots": userSpots
    });
})

//Get details of a Spot from an id
router.get('/:spotid', requireAuth, async (req, res) => {
    const spotid = req.params.spotid

    const spot = await Spot.findByPk(spotid, {
        include: [
            { model: Review }, 
            { model: SpotImage, attributes: [
                "id",
                "url",
                "preview" 
            ]},
            { model: User, attributes: [
                "id",
                "firstName",
                "lastName"
            ], as: "Owner"} 
        ]
    });
    
    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot not found",
        });
    }

    if(spot.ownerId !== req.user.id){
        res.status(401).json({error: "Must be owner to edit this spot"})
    }

    spot.dataValues.numReviews = spot.dataValues.Reviews.length

    const avgRating = spot.dataValues.Reviews.reduce((acc, review) => {
        return acc + review.stars;
    }, 0) / spot.dataValues.Reviews.length;

    spot.dataValues.avgRating = avgRating;
    delete spot.dataValues.Reviews

    res.json(spot)
})


//create a review for a spot by id
router.post('/:spotid/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotid; // The spot ID from the URL params
    const { review, stars } = req.body; // Extract review and stars from the request body

    // Validate review and stars
    if (!review || stars === undefined || stars < 1 || stars > 5) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: review ? undefined : "Review text is required",
                stars: stars >= 1 && stars <= 5 ? undefined : "Stars must be an integer from 1 to 5",
            }
        });
    }

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }

    // Check if the user already has a review for this spot
    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId,
        },
    });

    if (existingReview) {
        return res.status(403).json({
            message: "User already has a review for this spot",
        });
    }

    // Create the new review
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review: review,
        stars: stars,
    });

    // Return the newly created review
    res.status(201).json(newReview);
});

//Get all Reviews by a Spot's id
router.get('/:spotid/reviews', requireAuth, async (req, res)=>{
    const spotid = req.params.spotid; // The spot ID from the URL params

    const spot = await Spot.findByPk(spotid);
    
    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot not found",
        });
    }
    
    const reviews = await Review.findAll({
        where: {spotId: spotid},
        include: [
            {model: User, attributes: ["id", "firstName", "lastName"]},
             {model: ReviewImage, attributes: ["id", "url"]}
            ]
    })

    res.json({"Reviews": reviews})
    
})

// Get all bookings for a spot based on the spot's id
router.get('/:spotid/bookings', requireAuth, async (req, res) => {
    const spotid = req.params.spotid; // The spot ID from the URL params
    const userId = req.user.id; // The ID of the current authenticated user

    // Find the spot by ID
    const spot = await Spot.findByPk(spotid);

    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot not found",
        });
    }

    const isOwner = spot.ownerId === userId;

    const bookings = await Booking.findAll({
        where: { spotId: spotid },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] }
        ]
    });

    const bookingsResponse = bookings.map(booking => {
        let bookingData = {
            id: booking.id,
            spotId: booking.spotId,
            userId: booking.ownerId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
            user: booking.User
        };

      
        if (!isOwner) {
            bookingData = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
            return bookingData;
        }

        return bookingData;
    });

    // Respond with the bookings data
    return res.json({
        "Bookings": bookingsResponse
    });
});


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotid/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotid;
    const { startDate, endDate } = req.body;

    // Find the spot
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        // If the spot does not exist, return a 404 error
        return res.status(404).json({
            message: "Spot not found",
        });
    }

    // Validate required fields
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (spot.ownerId === req.user.id) {
        return res.status(400).json({
            message: "User must not own spot",
        });
    }

    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find existing bookings and check for date overlaps
    const bookings = await Booking.findAll({
        where: { spotId: spotId }
    });

    // Check if any booking overlaps with the new booking dates
    for (const booking of bookings) {
        const existingStart = new Date(booking.startDate);
        const existingEnd = new Date(booking.endDate);

        // Check if new booking's dates overlap with any existing booking's dates
        if ((start >= existingStart && start < existingEnd) || (end > existingStart && end <= existingEnd) || (start <= existingStart && end >= existingEnd)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
            });
        }
    }

    // Create new spot
    Booking.create({
        userId: req.user.id,
        spotId: spotId,
        startDate: startDate,
        endDate: endDate
    })

    return res.status(201).json({message: "yuppers"});
    
});



module.exports = router;