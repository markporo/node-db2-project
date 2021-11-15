// exports.up = function (knex) {
//   // The change we want to make in our schema

//   return knex.schema.createTable('cars', tbl => {
//     tbl.increments(); // auto increments the primary key for each object
//     tbl.string('vin', 17) // text field called username with two constraints via chained methods....128 character limit passed in
//       .unique()
//       .notNullable();
//     tbl.string('make')
//       .notNullable();
//     tbl.string('model')
//       .notNullable();
//     tbl.integer('mileage') // codegrade might want decimal.('mileage') decimal — table.decimal(column, [precision], [scale])
//       .notNullable();
//     tbl.string('title')
//     tbl.string('transmission')

//   })
// };

// exports.down = function (knex) {
//   // Undoing that change

//   return knex.schema.dropTableIfExists('cars'); // calling a method called dropTableIfExists to get rid of table...passes in the users table

// };

// npm add knex ---adds it locally
//npm install -g knex  --install knex globally
// knex init if you need knex file or npx knex init if you need the file and it is not running globally


// sudo chown -R $USER /usr/local/lib/node_modules ---had to put this in command line to fix error that wasn;t
// letting me install knex globally

exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('vin').unique().notNullable();
    tbl.text('make').notNullable();
    tbl.text('model').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.text('title');
    tbl.text('transmission');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};