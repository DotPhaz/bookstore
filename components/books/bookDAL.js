
class BookDAL {
    #collection;
    constructor() {
        this.#collection = fastify.mongo.db.collection('booksCollection')
    }

    // getBookId(book) {
    //     this.#collection
    // }

    getAllBooks() {
        return this.#collection.find().toArray()
    }
}

export default BookDAL