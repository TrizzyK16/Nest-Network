// backend/routes/api/spots.js
const express = require('express')
const router = express.Router();
const { Spot } = require('../../db/models')
const { User } = require('../../db/models')
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
        res.status(401).json({error: "Must be owner to edit this spot"})
    }

    spot.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })
})

module.exports = router;