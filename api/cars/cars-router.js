// DO YOUR MAGIC
const router = require('express').Router()
const carsModel = require('./cars-model')
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware')

router.get('/', async (req, res) => {
    // carsModel
    //     .getAll()
    //     .then((cars) => {
    //         res.status(200).json(cars)
    //     })
    //     .catch(() => {
    //         res.status(500).json({ message: "Cars could not be retrieved by Database." })
    //     })
    try {
        const cars = await carsModel.getAll()
        res.status(200).json(cars)
    } catch {
        res.status(500).json({ message: "Cars could not be retrieved by Database." })
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    try {
        const foundCar = await carsModel.getById(req.params.id)
        res.status(200).json(foundCar)
    } catch {
        res.status(500).json({ message: "The Car with that Id could not be found." })
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
    // DO YOUR MAGIC
    carsModel
        .create(
            {
                vin: req.body.vin.trim(),
                make: req.body.make.trim(),
                model: req.body.model.trim(),
                mileage: req.body.mileage,
                title: req.body.title.trim(),
                transmission: req.body.transmission.trim(),
            }
        )
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the account to the database" })
        })

})

router.delete('/:id', checkCarId, async (req, res) => {
    try {
        const foundCar = await carsModel.deleteById(req.params.id)
        return res.status(200).json(foundCar)
    } catch {
        return res.status(500).json({ message: "The Car with that Id could not be removed." })
    }
})



router.put('/:id', checkCarId, checkCarPayload, async (req, res) => {
    // DO YOUR MAGIC
    carsModel
    try {
        const tryUpdate = await carsModel.updateById(req.params.id, req.body)
        if (tryUpdate >= 1) {
            const updatedCar = await carsModel.updateById(req.params.id)
            res.status(200).json(updatedCar);
        }
    } catch {
        res.status(500).json({ message: "There was an error while updating the car." })
    }
});

module.exports = router;

// - Write CR (of CRUD) for the `cars` resource, using the middleware and model functions described above wherever appropriate inside `api/cars/cars-router.js` :

//   - `[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
//   - `[GET] /api/cars/:id` returns a car by the given id.
//   - `[POST] /api/cars` returns the created car.

// - Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.
// - Test your endpoints automatically by running `npm test`.

// | field        | data type        | metadata                                            |
// | ------------ | ---------------- | --------------------------------------------------- |
// | id           | unsigned integer | primary key, auto-increments, generated by database |
// | vin          | string           | required, unique                                    |
// | make         | string           | required                                            |
// | model        | string           | required                                            |
// | mileage      | numeric          | required                                            |
// | title        | string           | optional                                            |
// | transmission | string           | optional  