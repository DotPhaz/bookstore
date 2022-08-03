import Fastify from "fastify"
import dbConnection from './services/dbConnector.js'
import routes from './routes/routes.js'

const fastify = Fastify({logger: true})

fastify.register(dbConnection)
fastify.register(routes)

const start = async () => {
    try {
       await fastify.listen({port: 8000})
    } catch (err) {
        console.error('Error :', err)
        process.exit(1)
    }
}

start()