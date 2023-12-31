require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace with your MongoDB Atlas connection string
const uri = process.env.MONGO_URI;
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

app.post('/knowitall', async (req, res) => {
    const query = req.body.query;
    try{
        await client.connect();
        console.log("Successfully connected to mongoDB!")
    } finally {

        const db = client.db('Pages').collection('Pages');
        if((result = await db.findOne({
            title:query
        })) != null){
            // console.log(result)
            await client.close()
            res.status(200).send({
                data:result
            });
        }
        
    }

    // Handle data request logic here
    // res.send('<h1>Hello World</h1>');
    res.status(404).send()
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
