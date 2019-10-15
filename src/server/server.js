const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://sid-chae:root@sidscluster-a2ai6.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var db

MongoClient.connect(uri, {useNewUrlParser:true}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('sids-db');
    app.listen(port, () => {
        console.log('listening on 3000')
    });

    app.post('/urls', (req, res) => {
        db.collection('my-db').save(req.body, (err, result) => {
            if (err) return console.log(err)
            res.redirect('/')
        });
    });

    app.post('/setUrl', (req, res) => {
        db.collection('url-db').save(req.body,(err,result)=>{
            if(err)return console.log(err);
        });
    });

    app.get('/getUrl/:id', (req, res) => {
        const id=req.params.id;
        let query = {id:id};
        var cursor = db.collection('url-db').find(query).toArray((err,results)=>{
            res.send(results)
        });
    });

    app.post('/checkUrl', (req, res) => {
        let query = req.body;
        var cursor = db.collection('url-db').find(query).toArray((err,results)=>{
            res.send(results)
        });
    });
    app.post('/checkId', (req, res) => {
        let query = req.body;
        var cursor = db.collection('url-db').find(query).toArray((err,results)=>{
            res.send(results)
        });
    });
});
