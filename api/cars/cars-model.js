// - `getAll` resolves to an array of car records (or an empty array)
// - `getById` resolves to a car record by the given id
// - `create` resolves to the newly created car record
//- Add `[PUT]` and `[DELETE]` operations to your API.

const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars') // returns a promise that resolves to an **array** with all records in the table
}

const getById = id => { // will resolve to the **record** we want (if the id is unique for a table) or undefined
  // DO YOUR MAGIC

  return db('cars').where({ "id": id }).first()
}

const create = async car => { // resolves to array of id's of the created records
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car, "id"); // might be ({car: "car"})
  return getById(id)
  //db('cars').insert({ 'car': car }) // try db('cars').insert(car) if this doesn't work
}

const updateById = (id, carChanges) => { // resolves to the **number of records** affected by the update
  // DO YOUR MAGIC
  return db('cars').where('id', id).update(carChanges)
}

const deleteById = (id) => { // resolves to the **number of records** affected by the delete
  // DO YOUR MAGIC
  return db('cars').where('id', id).del()
}


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}



// db('foo-table') // returns a promise that resolves to an **array** with all records in the table
// db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
// db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
// db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
// db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
// db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
// db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete
// ```
