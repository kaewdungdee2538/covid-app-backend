const ApiRoute ={
    port:4070,
    db_config:{
        HOST_DB: "cit.bannayuu.com",
        PORT_DB: 5432,
        DATABASE_DB: "db_covid19",
        USER_DB: "cit",
        PASSWORD_DB: "db13apr",
        max: 1,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 2000,
    }
}

module.exports = ApiRoute;