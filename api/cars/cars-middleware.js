const carsModel = require('./cars-model')
const vinValidator = require('vin-validator');

exports.checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  // const [id] = req.params;
  carsModel
    .getById(req.params.id)
    .then(car => {
      if (car) {
        req.car = car;
        next()
      } else {
        res.status(404).json({ message: `car with id ${req.params.id} is not found` })
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error" });
    })
}


exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({ message: "vin is missing" })
  } else if (!req.body.make) {
    res.status(400).json({ message: "make is missing" })
  } else if (!req.body.model) {
    res.status(400).json({ message: "model is missing" })
  } else if (!req.body.mileage) {
    res.status(400).json({ message: "mileage is missing" })
  } else if (typeof req.body.vin !== "string" || typeof req.body.model !== "string" || typeof req.body.make !== "string") {
    res.status(400).json({ message: "field must be a string" })
  } else if (typeof req.body.mileage !== "number") {
    res.status(400).json({ message: "mileage must be a number" })
  }
  else {
    next()
  }
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  let isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin === false) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  } else {
    next()
  }

}

exports.checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  carsModel
    .getAll()
    .then((vins) => {
      let matchingCar = vins.find(c => c.vin === req.body.vin)

      if (matchingCar) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` });
      } else {
        next();
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error" });
    })

}


// - `checkCarId` returns a status 404 with a 
//`{ message: "car with id <car id> is not found" }
//` if the id in `req.params` does not exist in the database.

// - `checkCarPayload` returns a status 400 with a
// `{ message: "<field name> is missing" }` if any required field is missing.

// - `checkVinNumberValid` returns a status 400 with a `{ message: "vin <vin number> is invalid" }` if the vin number is [invalid](https://www.npmjs.com/package/vin-validator).
//var vinValidator = require('vin-validator');
//var isValidVin = vinValidator.validate('11111111111111111');


// - `checkVinNumberUnique` returns a status 400 with a `{ message: "vin <vin number> already exists" }` if the vin number already exists in the database.
