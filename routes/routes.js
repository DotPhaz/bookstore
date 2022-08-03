import { ObjectId } from "@fastify/mongodb"

export default async function routes(fastify, options) {
    const collection = fastify.mongo.db.collection('booksCollection')

    fastify.get('/', async (req, res) => {
        return {hello: 'world'}
    })

    fastify.get('/api/books', {
        schema: {
        description: "Books end-points",
        tags: ['books'],
        response: {
          200: {
            description: 'response and schema description',
            properties: {
                books: { type: 'array' }
            }
          }
        }
      }
    }, async (req, res) => {
        const books = await collection.find().toArray()
        console.log(books);
        if (books.length === 0) {
            throw new Error("No documents found")
        }
        res.send({books: books})
    })

    const bookBodyJsonSchema = {
        type: "object",
        required: ['name', 'author', 'year'],
        properties: {
            "name": {type: 'string'},
            "author": {type: 'string'},
            "year": {type: 'number'}
        }
    }

    const schema = {
        description: 'Post a book',
        tags: ['book'],
        body: bookBodyJsonSchema,
        response: {
            200: {
              description: 'Successful book added',
              type: 'object',
              properties: {
                book: { type: 'string' }
              }
        },
    }
}

    //Add new book
    fastify.post('/api/books', {schema}, async (req, res) => {
        const book = await collection.insertOne({
            name: req.body.name,
            author: req.body.author,
            year: req.body.year  
        })
        if(!book){
            throw new Error("Invalid value")
        }
        res.send({book: "Book added"})
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
        properties: {
            'name': {type: 'string'},
            'author': {type: 'string'},
            'year': {type: 'number'}
        }
    }


    fastify.put('/api/books/:book/update', { schema: {
        description: "Book update",
        tags: ['book'],
        params: {
            type: 'object',
            properties: {
                book: { type: 'string' }
            }
        },
        body: updateBookBodyJsonSchema,
        response: {
            200: {
                description: "Book updated",
                type: 'object',
                properties: {
                    book: {type: 'string'}
                }
            }
        }
    } },  async (req, res) => {
        const id = new ObjectId(req.params.book)
        const book = await collection.updateOne({_id: id}, {
            $set: req.body
        })

        if (!book) {
            throw new Error('Invalid value')
        } else if(book.matchedCount === 0) {
            res.send({book: "This book dones't exist"})
        } else if(book.modifiedCount === 0) {
            res.send({book: "This book has already updated"})
        }
        res.send({book: "Book has been updated"})
    })

    //Delete a book
    fastify.delete('/api/books/:book/delete', { schema: {
        description: 'Delete a book',
        tags: ['book'],
        params: {
            type: 'object',
            properties: {
                book: {
                    type: 'string',
                    description: "Book _id"
                }
            }
        },
        response: {
            200: {
                description: 'Successfully book delete',
                type: 'object',
                properties: {
                    book: {type: "string", description: "delete response"}
                }
            }

        }
    } } , async (req, res) => {
        const id = new ObjectId(req.params.book)
        const book = await collection.deleteOne({_id: id})
        if (!book) {
            throw new Error('Invalid value')
        } else if (book.deletedCount === 0){
            res.send({book: 'Book already deleted'})
        }
        res.send({book: 'Book deleted'})
    })
}