import Fastify from "fastify"
import { swaggerPlug} from './bookService.js'
import router from './bookAPI.js'

const fastify = Fastify({logger: true})

fastify.register(swaggerPlug)
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
