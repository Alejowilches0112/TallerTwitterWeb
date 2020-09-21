/**
 * Database Configuration Object
 */
const dbconfig = {
    HOST: "d1kb8x1fu8rhcnej.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "lfvdlamq7hg3vdkj",
    PASSWORD: "jt44t90h8j1noffj",
    DB: "g6nb9qas8vlpk1vc",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
module.exports = dbconfig;