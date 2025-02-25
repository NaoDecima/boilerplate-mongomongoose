require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://decimanao:lDhFfSRDnTl2SQYz@cluster0.l133z.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  
  name: {type: String, required: true},
  age: Number,
  favoriteFoods : [String]
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  
  let personInstance = new Person({name: "Mr Godson", age: 33, favoriteFoods:["Fish", "Bread", "Wine"]});
  
  personInstance.save(function errFirstNodeConventionCallback(err, data){
    if(err) return console.error(err)
    done(null , data);
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function(err, data){
    if(err) return console.error(err)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
     Person.find({name: personName}, function(err, personFound){
    if(err) return console.error(err);
    console.log(personFound)
    done(null, personFound);
  }) 
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound){
  if(err) return console.error(err)  
  done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, personFound){
    if(err) return console.error(err)
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) =>{
    if(err) return  console.error(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if(err) return console.error(err)
      console.log(`${foodToAdd} has been added as favorite to ${updatedPerson}`)
      done(null, updatedPerson)
    })
  })
    
  }

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},
                          {$set: {age: ageToSet}}, 
                          {new: true}, 
                          function (err, updatedPerson){
    if(err) return console.error(err)
    console.log(`${updatedPerson.name} age's updated to ${updatedPerson.age}`)
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, personRemoved) => {
    if(err) return console.error(err)
    console.log(`${personRemoved._id} has been removed from de Database`)
    done(null, personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, personRemoved) =>{
  if(err) return console.error(err)
  console.log(`${personRemoved.name} has been removed from the Database` )
  done(null, personRemoved);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
