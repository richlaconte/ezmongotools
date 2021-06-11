# ezmongotools

## Available functions:
### **insertDocs**(db, collectionName, arrayOfObjs, callback, logs)
  - db - db to edit
  - collectionName - name of collection to insert into
  - arrayOfObjs - single or multiple object/s wrapped in an array to add to collection
  - callback - callback to handle docs returned
  - logs - bool whether or not to console.log() data
```
 insertDocs(db, collection, [
    { 
        "organizationId": uuidv4(), 
        "name": req.body.name, 
        "owner": req.body.owner,
        "events": [] 
    }
], () => {
    findAllDocs(db, collection, (docs) => {
        console.log(docs)
        if (docs.length) {
            res.json({
                organizations: docs
            })
        } else {
            res.send('No organizations found.')
        }
    })
})
```
--- 
### **findAllDocs**(db, collectionName, callback, logs)
  - same as above, but without arrayOfObjs
### **findDocs**(db, collectionName, query, callback, logs)
  - see insertDocs
### **removeDoc**(db, collectionName, query, callback, logs)
  - see insertDocs
  - query - mongo query of which doc to remove
### **updateDoc**(db, collectionName, query, value, callback)
  - see removeDoc

## Example use:

```
const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const { insertDocs } = require('ezmongotools')

// Connection URL
const url = 'mongodb+srv://*********:********@cluster0.*****.mongodb.net/api?retryWrites=true&w=majority'

// Database Name
const dbName = 'databaseName'
const collection = 'users'

router.post('/', (req, res) => {
    if (req.body.name && req.body.password) {
        MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
            assert.strictEqual(null, err)
            console.log("Connected successfully to server")

            const db = client.db(dbName)

            insertDocs(db, collection, [{ name: req.body.name, password: req.body.password }], (docs) => {
                console.log(`added ${docs}`)
                res.send(docs)
            }, true)
        })
    } else {
        res.send(`please specify an account name`)
    }
})

module.exports = router

```
