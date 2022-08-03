import Fastify from "fastify"
import dbConnection from './services/dbConnector.js'
import routes from './routes/routes.js'
import swagger from "./services/swagger.js"

const fastify = Fastify({logger: true})

fastify.register(swagger)
fastify.register(dbConnection)
fastify.register(routes)

// fastify.swagger()


const start = async () => {
    try {
        await fastify.listen({port: 8000})
        fastify.swagger()
    } catch (err) {
        console.error('Error :', err)
        process.exit(1)
    }
}

start()