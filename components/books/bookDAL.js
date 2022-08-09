import Fastify from "fastify";
import fastifyMongodb from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";

const fastify = Fastify({logger: true})


class BookDAL {
    #collection;
    #mongo;
    
    constructor() {
        const mongo = fastifyPlugin( async (fastify, options) => {
            fastify.register(fastifyMongodb, {
                forceClose: true,
                url: 'mongodb://localhost:27017/bookstore'
            })
        })

        fastify.register(mongo)
        console.log('*******fastify : ', fastify.register(mongo));
        // this.#collection = fastify.mongo.db.collection('booksCollection')
    }


    // getBookId(book) {
    //     this.#collection
    // }

    getAllBooks() {
        return 'test api'
    }
}

export default BookDAL