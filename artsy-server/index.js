

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express =require('express')
require('dotenv').config();
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;

//middleware
app.use(cors({
  origin:["http://localhost:5173","https://artsio-2a535.web.app","https://artsio-2a535.web.app"]
}))
app.use(express.json());

//Artsy-1
//wVMjD2KmJKJ659wc

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.onhj8vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://Artsy-1:wVMjD2KmJKJ659wc@cluster0.onhj8vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("artDB");
    const artCollection = database.collection("artWork");
    const userCollection = database.collection("user");
    const featuredCollection = database.collection("Featured_Artist");

    app.get('/artworks',async(req,res)=>{
      const cursor = artCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

     app.get('/featured',async(req,res)=>{
      const cursor = featuredCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/artworks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    
    const result = await artCollection.findOne(query); // Use findOne instead of find
    
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ error: 'Artwork not found' });
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
  
app.put("/artworks/:id", async (req, res) => {
  const id =req.params.id;
  const filter ={_id:new ObjectId(id)}
  const options = {upsert:true};
  const updatedInfo = req.body;

  const updatedArt={
    $set:{
      image:updatedInfo.image,
      item_name:updatedInfo.item_name,
      subcategory:updatedInfo.subcategory,
      description:updatedInfo.description,
      price:updatedInfo.price,
      rating:updatedInfo.rating,
      customization:updatedInfo.customization,
      processing_time:updatedInfo.processing_time,
      stockStatus:updatedInfo.stockStatus,
      email:updatedInfo.email,
      name:updatedInfo.name
    }
  }

  const result =await artCollection.updateOne(filter,updatedArt,options);
  res.send(result)
})


    app.post('/artworks', async(req,res)=>{
        const newArtwork = req.body;
       const result = await artCollection.insertOne(newArtwork);
       res.send(result);
      
    })

    app.delete('/artworks/:id', async(req,res)=>{
      const id = req.params.id;
       const query = {_id: new ObjectId(id)}
       const result= await artCollection.deleteOne(query);
       res.send(result);

    })

    //user related apis

    app.post('/users', async(req,res)=>{
        const user = req.body;
       const result = await userCollection.insertOne(user);
       res.send(result);
    })

    app.get('/users',async(req,res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
	res.send('Users Management server is running ')
})

app.listen(port,() =>{
	console.log(`sever port ${port}`)
})