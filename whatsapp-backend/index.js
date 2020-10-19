//importing
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import Messages from './dbMessages.js';
//app config
const app=express();
const port=process.env.PORT || 9000;
const pusher = new Pusher({
    //info copied from new app in pusher website
  });
//middleware
app.use(express.json());
app.use(cors());
/*app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})*/
//used cors to replace this
//DB config
const database_url="";//url copied from mongo db website 
mongoose.connect(database_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.once('open',()=>{
    console.log("DB Connected");
    const msgCollection=db.collection("messagecontents");
    const changeStream=msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log("A change occured",change);
        if(change.operationType=='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
             {
                 name:messageDetails.name,
                 message:messageDetails.message,
                 timestamp:messageDetails.timestamp,
                 received:messageDetails.received
             }
            );
        } else {
            console.log("Error Trigerring Pusher");
        }
    });
});

// ????

//api routes
app.get("/",(req,res)=>res.status(200).send("Hello World"));

app.get("/messages/sync",(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

//listen
app.listen(port,()=>console.log(`Server started running at : ${port}`));