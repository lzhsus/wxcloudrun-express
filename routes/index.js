// routes/index.js
var express = require('express');
var router = express.Router();

const userDap = require("../dao/userDao")


/* 登录 */
router.post('/count', function (req, res) {
    const data = {    
        userName: req.body.userName,
    }
    console.log(data)
    userDap.count(data, content => {
        res.json(content);
    })
});

module.exports = router;
