import fastifyPlugin from "fastify-plugin"
import fastifySwagger from "@fastify/swagger";



//Swagger Service
const swagger = async (fastify, options) => {
    fastify.register(fastifySwagger, {
        routePrefix: '/documentation',
        swagger: {
            info: 'Bookstore API',
            description: 'Bookstore API swagger documentation',
            version: '0.1.0'
        },
        host: 'localhost:8000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'book', description: 'A book related end-points' },
            { name: 'books', description: 'Books related end-points' }
        ],
        definitions: {
            book: {
                type: 'object',
                required: ['name', 'author', 'year'],
                properties: {
                    name: {type: 'string'},
                    author: {type: 'string'},
                    year: {type: 'number'}
                }
            }
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
          },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        exposeRoute: true
    })
}


export const swaggerPlug = fastifyPlugin(swagger)

