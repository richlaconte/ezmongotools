const assert = require('assert')

const insertDocs = function (db, collectionName, arrayOfObjs, callback, logs) {

    // Get the documents collection
    const collection = db.collection(collectionName)

    // Insert some documents
    collection.insertMany(arrayOfObjs, (err, result) => {
        assert.strictEqual(err, null)
        assert.strictEqual(arrayOfObjs.length, result.result.n)
        assert.strictEqual(arrayOfObjs.length, result.ops.length)
        logs && console.log(`Inserted ${arrayOfObjs.length} document${arrayOfObjs.length > 1 ? 's' : ''} into the collection`)
        callback(result)
    })
}

const findAllDocs = function (db, collectionName, callback, logs) {

    // Get the documents collection
    const collection = db.collection(collectionName)

    // Find some documents
    collection.find({}).toArray((err, docs) => {
        assert.strictEqual(err, null)
        logs && console.log("Found the following records")
        logs && console.log(docs)
        callback(docs)
    })
}

const findDocs = function (db, collectionName, query, callback, logs) {

    // Get the documents collection
    const collection = db.collection(collectionName)

    logs && console.log('query:')
    logs && console.log(query)

    // Find some documents
    collection.find(query).toArray((err, docs) => {
        assert.strictEqual(err, null)
        callback(docs)
    })
}

const removeDoc = function (db, collectionName, query, callback, logs) {

    // Get the documents collection
    const collection = db.collection(collectionName)

    collection.deleteOne(query, (err, result) => {
        assert.strictEqual(err, null)
        logs && console.log(result.result.n)

        assert.strictEqual(1, result.result.n)
        logs && console.log("Removed the document with the field name equal to 'test'")

        callback(result)
    })
}

const updateDoc = function (db, collectionName, query, value, callback) {

    // Get the documents collection
    const collection = db.collection(collectionName)

    // Update document
    collection.updateOne(query
        , { $set: value }, (err, result) => {
            assert.strictEqual(err, null)
            assert.strictEqual(1, result.result.n)
            callback(result)
        })
}


module.exports = { insertDocs, findAllDocs, findDocs, removeDoc, updateDoc }