const MongoClient = require('mongodb').MongoClient
const config =  require('../config.json')
const dbCache = {};


class MongoDAO{
    constructor(database, collection){
        this.url = config.mongopath;
        this.database = database;
        this.collectionName = collection;
        this.collection = null;
    }

    async connect(){
        let mongoURL = `${this.url}/${this.database}`
        let db = null;
        if(dbCache[mongoURL]){
            db = dbCache[mongoURL];
        }else{
            db = await MongoClient.connect(mongoURL);
            dbCache[mongoURL] = db;
        }
        const _db = db.db();
        this.collection = _db.collection(this.collectionName);
    }

    async get(index, params = {}){
        await this.connect();
        const doc = await this.collection.findOne({_id: index});
        return(doc);
    }

    async save(content){
        await this.connect();
        if(content._id){
            await this.collection.updateOne(
              { _id: content._id },
              { $set: content },
              { upsert: true }
            );
        } else{
            await this.collection.insertOne(content);
        }
        return (content) 
    }

    async query(query){
        await this.connect();
        return this.collection.find(query).toArray();
    }
}

module.exports = MongoDAO;
