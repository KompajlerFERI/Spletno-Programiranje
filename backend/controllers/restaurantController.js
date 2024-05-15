var RestaurantModel = require('../models/restaurantModel.js');

/**
 * restaurantController.js
 *
 * @description :: Server-side logic for managing restaurants.
 */
module.exports = {

    /**
     * restaurantController.list()
     */
    list: function (req, res) {
        RestaurantModel.find()
        //.populate('tags')
        .then(restaurants => {
            return res.json(restaurants);
        }).catch(err => {
            return res.status(500).json({
                message: 'Error when getting restaurants.',
                error: err
            });
        });
    },

    /**
     * restaurantController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({_id: id})
        //.populate('menus')
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }

            return res.json(restaurant);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting restaurant.',
                error: err
            });
        });
    },

    /**
     * restaurantController.create()
     */
    create: function (req, res) {
        var restaurant = new RestaurantModel({
			name : req.body.name,
			address : req.body.address,
			mealPrice : req.body.mealPrice,
			mealSurcharge : req.body.mealSurcharge,
			workingHours : req.body.workingHours,
			tags : req.body.tags,
			coordinates : req.body.coordinates,
			menus : req.body.menus
        });

        restaurant.save()
        .then(restaurant => {
            return res.status(201).json(restaurant);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when creating restaurant',
                error: err
            });
        });
    },

    /**
     * restaurantController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({_id: id})
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }

            restaurant.name = req.body.name ? req.body.name : restaurant.name;
			restaurant.address = req.body.address ? req.body.address : restaurant.address;
			restaurant.mealPrice = req.body.mealPrice ? req.body.mealPrice : restaurant.mealPrice;
			restaurant.mealSurcharge = req.body.mealSurcharge ? req.body.mealSurcharge : restaurant.mealSurcharge;
			restaurant.workingHours = req.body.workingHours ? req.body.workingHours : restaurant.workingHours;
			restaurant.tags = req.body.tags ? req.body.tags : restaurant.tags;
			restaurant.coordinates = req.body.coordinates ? req.body.coordinates : restaurant.coordinates;
			restaurant.menus = req.body.menus ? req.body.menus : restaurant.menus;
			
            restaurant.save()
            .then(restaurant => {
                return res.json(restaurant);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when updating restaurant.',
                    error: err
                });
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting restaurant',
                error: err
            });
        });
    },

    /**
     * restaurantController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOneAndDelete(id)
        .then(restaurant => {
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant'
                });
            }
            return res.status(204).json();
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when deleting the restaurant.',
                error: err
            });
        });
    }
};