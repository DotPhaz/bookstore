import fastifyPlugin from 'fastify-plugin'
import fastifyMongodb from "@fastify/mongodb";


async function dbConnector(fastify, options) {
    fastify.register(fastifyMongodb, {
        forceClose: true,
        url: 'mongodb://localhost:27017/bookstore'
    })
}

export default fastifyPlugin(dbConnector)