import { ObjectId } from "@fastify/mongodb"

export default async function routes(fastify, options) {
    const collection = fastify.mongo.db.collection('booksCollection')

    fastify.get('/', async (req, res) => {
        return {hello: 'world'}
    })

    fastify.get('/api/books', async (req, res) => {
        const book = await collection.find().toArray()
        
        if (book.length === 0) {
            throw new Error("No documents found")
        }
        return book
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
        const book = await collection.insertOne({
            name: req.body.name,
            author: req.body.author,
            year: req.body.year  
        })
        return book
    })

    //Get a book
    fastify.get('/api/books/:book', async (req, res) => {
        const id =  new ObjectId(req.params.book)
        const book = await collection.findOne({_id: id})
        if (!book) {
            throw new Error('Invalid value')
        }
        return book
    })

    //Update a book
    const updateBookBodyJsonSchema = {
        type: "object",
        required: [],
        properties: {
            'name': {type: 'string'},
            'author': {type: 'string'},
            'year': {type: 'number'}
        }
    }

    const updateSchema = {
        body: updateBookBodyJsonSchema
    }

    fastify.put('/api/books/:book/update', { updateSchema },  async (req, res) => {
        const id = new ObjectId(req.params.book)
        const book = await collection.updateOne({_id: id}, {
            $set: req.body
        })

        if (!book) {
            throw new Error('Invalid value')
        }
        return book
    })

    //Delete a book
    fastify.delete('/api/books/:book/delete', async (req, res) => {
        const id = new ObjectId(req.params.book)
        const book = await collection.deleteOne({_id: id})
        if (!book) {
            throw new Error('Invalid value')
        }
        return book
    })
}