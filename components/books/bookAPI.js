import bookDAL from './bookDAL.js'

async function router(fastify, options) {
    
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
            type: 'object',
            properties: {
                books: { type: 'array' }
            },
            example: { 
                    books: [ 
                        {name: 'Test 1', author: "Jon Doe", year: 2019},
                        {name: 'Great Thing', author: "Doe Jhon", year: 1998},
                        {name: 'Programming', author: "Coder", year: 2022}
                    ]
            },
            
          }
        }
      }
    }, async (req, res) => {
        new bookDAL();
        
        const books = await bookDAL.getAllBook();
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
                description: "Add new book",
                type: 'array',
                example: [ 
                        {acknowledged: "boolean", insertedId: "book_id"}
                    ]
                }
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
        res.send([book])
    })


    //Get a book
    fastify.get('/api/books/:book', { schema: {
        description: "Get a book",
        tags: ['books'],
        params: {
            type: 'object',
            properties: {
                book: {type: 'string'}
            }
        },
        response: {
            200: {
              description: "Get book",
              type: 'object',
              properties: {
                book: {type: 'array', description: "received book"}
              },
              example: { 
                  book: [ 
                      {name: 'Programming', author: "Coder", year: 2022}
                  ]
              },
            },
        },
    }

    }, async (req, res) => {
        const id =  new ObjectId(req.params.book)
        const book = await collection.findOne({_id: id})
        if (!book) {
            throw new Error('Invalid value')
        }
         res.send({book: [book]})
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
                },
                example: {
                    book: "Book info"                    
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
        res.send({book: book})
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


export default router