const { Pool } = require('pg')
const ApiRoute = require("./conf");


 const pool = new Pool({
   user: ApiRoute.db_config.USER_DB,
   host: ApiRoute.db_config.HOST_DB,
   database: ApiRoute.db_config.DATABASE_DB,
   password:ApiRoute.db_config.PASSWORD_DB,
   port: ApiRoute.db_config.PORT_DB,
   max: ApiRoute.db_config.max,
   idleTimeoutMillis: ApiRoute.db_config.idleTimeoutMillis,
   connectionTimeoutMillis: ApiRoute.db_config.connectionTimeoutMillis,
 })


 module.exports = pool;