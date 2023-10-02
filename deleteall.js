const { MongoClient } = require('mongodb');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://Siddhant:deedis@cluster0.yfmxfot.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteAllDocuments() {
  try {
    await client.connect();

    const db = client.db('Pages'); // Replace with your database name
    const collection = db.collection('Pages'); // Replace with your collection name

    // Delete all documents in the collection by providing an empty filter
    const deleteResult = await collection.deleteMany({});

    console.log(`Deleted ${deleteResult.deletedCount} documents`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    await client.close();
  }
}

deleteAllDocuments();
