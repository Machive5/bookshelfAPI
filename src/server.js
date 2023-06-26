const hapi = require("@hapi/hapi");
const path = require("path");
const routes = require(path.resolve(__dirname,'routes.js'));

const run = async ()=>{
    const server = hapi.server({
        host: "localhost",
        port: "9000",
        routes:{
            cors:{
                origin: ['*']
            }
        }
    });
    server.route(routes)
    await server.start();
    console.log(`server runing at ${server.info.uri}`)
}

run();