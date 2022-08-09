import Fastify from "fastify"
import { dbConnector, swagger} from './bookService.js'
import router from './bookAPI.js'

const fastify = Fastify({logger: true})

fastify.register(swagger)
fastify.register(dbConnector)
fastify.register(router)

export const start = async () => {
    try {
        await fastify.listen({port: 8000})
        fastify.swagger()
    } catch (err) {
        console.error('Error :', err)
        process.exit(1)
    }
}
