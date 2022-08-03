import { ObjectId } from "@fastify/mongodb"

export default async function routes(fastify, options) {
    const collection = fastify.mongo.db.collection('booksCollection')

    fastify.get('/', async (req, res) => {
        return {hello: 'world'}
    })

    fastify.get('/api/books', async (req, res) => {
        const result = await collection.find().toArray()
        console.log(result);
        if (result.length === 0) {
            throw new Error("No documents found")
        }

        return result
    })

    const bookBodyJsonSchema = {
        type: "object",
        required: ['name', 'author', 'year'],
        properties: {
            'name': {type: 'string'},
            'author': {type: 'string'},
            'year': {type: 'number'}
        }
    }

    const schema = {
        body: bookBodyJsonSchema,
    }

    //Add new book
    fastify.post('/api/books', schema, async (req, res) => {
        const result = await collection.insertOne({
            name: req.body.name,
            author: req.body.author,
            year: req.body.year  
        })
        return result
    })

    fastify.get('/api/books/:book', async (req, res) => {
        const id =  new ObjectId(req.params.book)
        const result = await collection.findOne({_id: id})
        if (!result) {
            throw new Error('Invalid value')
        }
        return result
    })
}