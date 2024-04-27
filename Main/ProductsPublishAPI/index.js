const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// POST request to /products
router.post('/', async (req, res, next) => {
    try {
        // Extracting product details from request body
        const { name, price, mrp, stock } = req.body;

        // Creating a new product with isPublished set to false
        const product = await Product.create({
            name,
            price,
            mrp,
            stock,
            isPublished: false
        });

        // Sending the newly created product in the response
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

// GET request to /products
router.get('/', async (req, res, next) => {
    try {
        // Fetching all products ordered by their ids in increasing order
        const products = await Product.findAll({ order: [['id', 'ASC']] });

        // Sending the array of products in the response
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// PATCH request to /products/:id
router.patch('/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;
        // Assuming the body sent will always be {"isPublished":true}
        const { isPublished } = req.body;

        // Fetching the product by id
        const product = await Product.findByPk(productId);

        // Validating criteria for publishing
        if (product.mrp >= product.price && product.stock > 0) {
            // Updating isPublished field to true
            await product.update({ isPublished: true });
            res.sendStatus(204);
        } else {
            // Criteria validation failed, sending appropriate error message
            const errors = [];
            if (product.mrp < product.price) {
                errors.push('MRP should be less than equal to the Price');
            }
            if (product.stock === 0) {
                errors.push('Stock count is 0');
            }
            res.status(422).json(errors);
        }
    } catch (error) {
        next(error);
    }
});

// DELETE request to /products/:id
router.delete('/:id', (req, res) => {
    // Responding with Method Not Allowed status code
    res.sendStatus(405);
});

// PUT request to /products/:id
router.put('/:id', (req, res) => {
    // Responding with Method Not Allowed status code
    res.sendStatus(405);
});


// Handling errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
