const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { init: initDB, Counter,ApplyCarQrUserInfo } = require('./db');

const logger = morgan('tiny');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 更新计数
app.post('/api/count', async (req, res) => {
  const { action } = req.body;
  if (action === 'inc') {
    await Counter.create();
  } else if (action === 'clear') {
    await Counter.destroy({
      truncate: true,
    });
  }
  res.send({
    code: 0,
    data: await Counter.count(),
  });
});

// 获取计数
app.get('/api/count', async (req, res) => {
  const result = await Counter.count();
  res.send({
    code: 0,
    data: result,
  });
});

// create
app.post('/api/apply-car-qr', async (req, res) => {
  let data = {
    mobile:15239371927,
    name:"龙张海",
    openID:req.headers['x-wx-openid']
  }
  ApplyCarQrUserInfo.create(data);
  res.send({
    code: 0,
    data: data,
  });
});
app.post('/api/apply-car-qr2', async (req, res) => {
  let data = {
    mobile:15239371927,
    name:"龙张海",
    openID:req.headers['x-wx-openid']
  }
  res.send({
    code: 0,
    data: data,
  });
});
app.post('/api/apply-car-qr3', async (req, res) => {
  let data = {
    mobile:15239371927,
    name:"龙张海",
    openID:req.headers['x-wx-openid']
  }
  await ApplyCarQrUserInfo.create(data);

  res.send({
    code: 0,
    data: data,
  });
});
app.get('/api/apply-car-qr3', async (req, res) => {
  let data = {
    mobile:15239371927,
    name:"龙张海",
    openID:req.headers['x-wx-openid']
  }
  await ApplyCarQrUserInfo.create(data);

  res.send({
    code: 0,
    data: data,
  });
});



app.post('/api/apply-car-qr4', async (req, res) => {
  let data = {
    mobile:15239371927,
    name:"龙张海",
    openID:req.headers['x-wx-openid']
  }
  let u = new ApplyCarQrUserInfo();
  u.mobile = data.mobile;
  u.name = data.name;
  u.openID = data.openID;

  await u.save()
  res.send({
    code: 0,
    data: data,
  });
});


// 小程序调用，获取微信 Open ID
app.get('/api/wx_openid', async (req, res) => {
  if (req.headers['x-wx-source']) {
    res.send(req.headers['x-wx-openid']);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log('启动成功', port);
  });
}

bootstrap();
