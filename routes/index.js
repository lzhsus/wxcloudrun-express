// routes/index.js
var express = require('express');
var router = express.Router();

const userDap = require("../dao/userDao")


/* 登录 */
router.get('/user/count', function (req, res) {
    const data = {    
        userName: req.body.userName,
    }
    try {
        userDap.count(data, content => {
            res.json(content);
        })
    } catch (error) {
        res.json(req.body);
    }
});

module.exports = router;
