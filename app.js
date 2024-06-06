const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');   //方便操作cookie 
const morgan = require("morgan");
const bodyParser = require('body-parser') // HTTP请求体解析

var indexRouter = require('./routes/index');    //路由

// const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
// 默认的json解析器
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// cookie解析器
app.use(cookieParser());
// 访问静态文件
app.use(express.static(path.join(__dirname, 'public')));

//  json解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// 新增设置响应头
app.all('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	}
	else {
		next();
	}
});
// console.log(indexRouter)
// 路由
app.use('/', indexRouter);

// 首页
// app.get("/", async (req, res) => {
// 	// res.sendFile(path.join(__dirname, "index.html"));
// });

// // 更新计数
// app.post("/api/count", async (req, res) => {
// 	const { action } = req.body;
// 	if (action === "inc") {
// 		await Counter.create();
// 	} else if (action === "clear") {
// 		await Counter.destroy({
// 			truncate: true,
// 		});
// 	}
// 	res.send({
// 		code: 0,
// 		data: await Counter.count(),
// 	});
// });

// // 获取计数
// app.get("/api/count", async (req, res) => {
// 	const result = await Counter.count();
// 	res.send({
// 		code: 0,
// 		data: result,
// 	});
// });

// // 小程序调用，获取微信 Open ID
// app.get("/api/wx_openid", async (req, res) => {
// 	if (req.headers["x-wx-source"]) {
// 		res.send(req.headers["x-wx-openid"]);
// 	}
// });

// const port = process.env.PORT || 80;

// async function bootstrap() {
// 	await initDB();
// 	app.listen(port, () => {
// 		console.log("启动成功", port);
// 	});
// }

// bootstrap();// error handler 自定义错误抛出中间件 （框架生成）
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;