import Fastify from "fastify";
import fp from "fastify-plugin";
import routes from "../routes/routes.js";
import dbConnector from '../services/dbConnector.js'

export function build(opts= {}) {
    const app = Fastify(opts);
    app.register(fp(dbConnector))
    app.register(fp(routes))
    return app;
}

