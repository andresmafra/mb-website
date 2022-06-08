const config = require('../../config')
const { MongoClient } = require('mongodb')

const USER = process.env.MB_MONGO_USER || config.mongo.user
const PASSWORD = process.env.MB_MONGO_PASSWORD || config.mongo.password

const mongoUri = `mongodb://${USER}:${PASSWORD}@${config.mongo.domain}/?ssl=true&replicaSet=atlas-x23z27-shard-0&authSource=admin&retryWrites=true&w=majority`

const getLastQuotations = async () => {
  try {
    const client = new MongoClient(mongoUri)
    await client.connect()
    const collection = client.db('mbBrokers').collection('dbBrokerHistory');
    const lastBroker = await collection.find().limit(1).sort({ collectedAt: -1 }).toArray()
    const brokersCollectedAtSameTime = await collection.find({ collectedAt: lastBroker[0].collectedAt }).toArray()
    return brokersCollectedAtSameTime
  } catch (error) {
    console.error(error)
    return []
  }
}

module.exports = {
  getLastQuotations
}