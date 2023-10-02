const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Siddhant:deedis@cluster0.yfmxfot.mongodb.net/?retryWrites=true&w=majority";
const initialUrl = 'https://en.wikipedia.org/wiki/Car';

var count = 0;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});



async function crawlPage(url,links_list) {
    count++;
  try {
    const db = client.db("Pages").collection("Pages");
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract data from the page using jQuery-like syntax
    // Example:
    const title = $('title').text();
    console.log(`Title: ${title}`);
    
    const document = {
        title:title,
        link:url
    }

    if(await db.findOne(document) == null){
        const result = await db.insertOne(document);
        console.log(`Inserted document with _id: ${result.insertedId}`);
    }
    // You can also find and follow links to other pages
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link) {
        if(link.match("https://en.wikipedia.org/")){
            if(count > 10)return;
            // Process the link and crawl it if needed
            links_list.push(link);
            console.log(link);
      }
    }
    });
  } catch (error) {
    console.error('Error crawling page:', error);
  }
}

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      console.log("You successfully connected to MongoDB!");
    } finally {
      // Start crawling from the initial URL
        await crawlPages(initialUrl);
        await client.close();
    }
}

async function crawlPages(initialUrl){
    var links_list = [];
    links_list.push(initialUrl);

    while(links_list.length != 0){
        await crawlPage(links_list.pop(),links_list);
    }
}

run().catch(console.dir);