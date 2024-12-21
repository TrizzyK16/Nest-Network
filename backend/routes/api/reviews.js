// backend/routes/api/reviews.js
const express = require('express')
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');

//Get all Reviews of the Current User
router.get('/session', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: { userId: userId },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
            },
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
                    "price",
                ],
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"],
            },
        ],
    });

    // Add previewImage to each spot by querying SpotImage table separately
    for (let review of reviews) {
        if (review.Spot) {
            const spotId = review.Spot.id;
            const previewImage = await SpotImage.findOne({
                where: { spotId: spotId, preview: true },
                attributes: ["url"],
            });

            // Add previewImage or set null if not found
            review.Spot.dataValues.previewImage = previewImage.url
        }
    }

    res.status(200).json({ "Reviews": reviews });
});

module.exports = router;