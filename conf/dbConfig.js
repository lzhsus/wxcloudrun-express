
// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [ host, port ] = MYSQL_ADDRESS.split(":");

//  conf/dbConfig.js
const config = {
    port: port,
    database: {
        DATABASE: 'nodejs_demo',       //数据库名
        USERNAME: MYSQL_USERNAME,           //用户
        PASSWORD: MYSQL_PASSWORD,         //密码
        HOST: host,          //ip
        PORT: port,               //端口号
        insecureAuth: true,
        useConnectionPooling: true,
        multipleStatements: true   
    }
}

module.exports = config