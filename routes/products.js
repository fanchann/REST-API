var express = require('express');
var router = express.Router();
const v = require('fastest-validator');
const {
    product
} = require('../models')
const bodyParser = require('body-parser');

const check = new v()

router.get('/', async (req, res) => {
    const products = await product.findAll();
    return res.json(products)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const products = await product.findByPk(id);
    return res.json(products || {})
})


router.post('/', async (req, res) => {
    try {
        const schema = {
            name: 'string',
            brand: 'string',
            desc: 'string|optional'
        }
        const validate = check.validate(req.body, schema);

        if (validate.length) {
            return res.json({
                status: 400,
                message: validate
            })
        }

        const products = await product.create(req.body);
        res.json(products)
    } catch (err) {
        res.json({
            status: 500,
            message: "eror kontol",
        })
    }

})

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let products = await product.findByPk(id);

    if (!products) {
        return res.json({
            status: 400,
            message: "Product not found"
        })
    }

    const schema = {
        name: 'string|optional',
        brand: 'string|optional',
        desc: 'string|optional'
    }
    const validate = check.validate(req.body, schema);

    if (validate.length) {
        return res.json({
            status: 400,
            message: validate
        })
    }
    products = await products.update(req.body);

    res.json(products)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const products = await product.findByPk(id);
    if (!products) {
        return res.json({
            message: "Product Not Found!"
        })
    }

    await products.destroy();
    res.send({
        message: "Product deleted!"
    })
})



module.exports = router