const express = require("express");
const app = express();
require('dotenv').config
const cors = require("cors")
const { MongoClient, ServerApiVersion, LEGAL_TCP_SOCKET_OPTIONS, ObjectId } = require('mongodb');
const port = process.env.Port || 5000;


// middware
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://coffee-master:E3lwLT2iyXMo1gqG@cluster0.ga6ydds.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// console.log(uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const coffeeCollection = client.db('coffeeDB').collection('coffee');

    // get api post er datae jn get api 

    app.get('/coffee', async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

  // post api backend 
  app.post('/coffee', async (req, res) => {
    const newCoffee = req.body;
    console.log(newCoffee);
    const result = await coffeeCollection.insertOne(newCoffee);
    res.send(result);
  })
  // update api in mongodb theke speack in load 
  app.get('/coffee/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await coffeeCollection.findOne(query);
    res.send(result);
})
// put api update api in javascript
app.put('/coffee/:id', async(req, res) => {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const options = { upsert: true };
  const updatedCoffee = req.body;

  const coffee = {
      $set: {
          name: updatedCoffee.name, 
          quantity: updatedCoffee.quantity, 
          supplier: updatedCoffee.supplier, 
          taste: updatedCoffee.taste, 
          category: updatedCoffee.category, 
          details: updatedCoffee.details, 
          photo: updatedCoffee.photo
      }
  }

  const result = await coffeeCollection.updateOne(filter, coffee, options);
  res.send(result);
})

  
  // delete api 
  app.delete('/coffee/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) }
    const result = await coffeeCollection.deleteOne(query);
    res.send(result);
})
    
  }
  finally {


  }
}
run().catch(error => console.log(error))




app.get('/', (req, res) => {
  res.send("simplenode js")

})





app.listen(port, () => {
  console.log(`Server is running port${port}`)
})


// mongodb user name:coffee-House
// password : uIP2RMyc1gEUz1LY
