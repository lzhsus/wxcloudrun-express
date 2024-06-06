//  dao/userDao.js
let DBHelp = require('../conf/DBHelp');

module.exports = {
    count:(data,success)=>{
        let sql = "SELECT * FROM `Counters`  LIMIT 50 OFFSET 0";
        DBHelp(sql, data,(error, result, fields) => {
            if (error) {
                return success({ code: "-1", error: error.message });
            }
            return success({ code: "200", message: "success" });
        })
    }
}
