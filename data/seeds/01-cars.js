// STRETCH
exports.seed = function (knex) {
    //Deletes all existing entries
    return knex('cars').truncate() // resets the current db including id's
        .then(function () {
            //inserts seed entries
            return knex('cars').insert([
                {
                    vin: '11111111111111111',
                    make: 'toyota',
                    model: 'prius',
                    mileage: 250000,
                    title: 'salvage',
                    transmission: 'CVT',
                },
                {
                    vin: '22222222222222222',
                    make: 'ford',
                    model: 'mustang',
                    mileage: 120000,
                    title: 'clean',
                    transmission: 'manual',
                },
                {
                    vin: '33333333333333333',
                    make: 'honda',
                    model: 'accord',
                    mileage: 220000,
                    title: 'clean',
                    transmission: 'automatic',
                },
                {
                    vin: '44444444444444444',
                    make: 'ford',
                    model: 'explorer',
                    mileage: 250000,
                    title: 'extremely dirty',
                    transmission: 'automatic',
                },
                {
                    vin: '55555555555555555',
                    make: 'honda',
                    model: 'civic',
                    mileage: 23000,
                    title: 'clean',
                    transmission: 'automatic',
                },
                {
                    vin: '66666666666666666',
                    make: 'porsch',
                    model: 'daf',
                    mileage: 70000,
                    title: 'super dirty',
                    transmission: 'manual',
                },
                {
                    vin: '77777777777777777',
                    make: 'Ford',
                    model: 'Escort',
                    mileage: 240000,
                    title: 'dirty',
                    transmission: 'automatic',
                },
            ])
        })
}

// knex seed:make 01seedname to create see
// knex seed:run to pass seeds to database