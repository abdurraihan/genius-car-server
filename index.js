const express = require('express');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
const { query } = require('express');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p3kdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{

        await client.connect();
        const serviceCollection = client.db('geniuscar').collection('service');
        const orderCollection = client.db('geniuscar').collection('order');
        
        app.get('/service', async(req , res)=>{
            
        const query = {};
        const cursor = serviceCollection.find(query);
        const service = await cursor.toArray();

        res.send(service);


        })

        app.get('/service/:id' , async(req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        //post
        
app.post('/service' , async(req , res) =>{
    const newService = req.body;
    const result = await serviceCollection.insertOne(newService)
    res.send(result);
})


//delete 
app.delete('/service/:id' , async(req , res)=>{

    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await serviceCollection.deleteOne(query)
    res.send(result);
})


    // order collection API

    app.get('/order' , async(req, res)=>{

        const email = req.query.email;
        //console.log(email);
        const query = {email:email};
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
    })

    app.post('/order', async(req , res)=>{
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
    }) 

    }
    finally{

    }

}

run().catch(console.dir);



app.get('/' , (req,res)=>{
    res.send('running genius car');

})



app.listen(port ,()=>{
    console.log('listening to port' , port);
} )