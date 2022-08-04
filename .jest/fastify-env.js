// my-custom-environment
import NodeEnvironment from 'jest-environment-node';
import { build } from '../helper/helper.js'

const NodeEnvironmentDef = NodeEnvironment.default

class FastifyEnv extends NodeEnvironmentDef {
    async setup() {
        await super.setup()
        const fastify = await build({})
        this.global.fastify = fastify
    }
}


export default FastifyEnv