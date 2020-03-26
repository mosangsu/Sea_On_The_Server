const express = require('express');
const router = express.Router();

// 클라이언트 요청 get http://localhost:3000/cmd?cmd=TEST&value=1
router.get('/', (req, res, next) => {
    let query = req.query;
    //log('get query %j', query);
    if (typeof(query) === 'string')
    {
        try {
            query = JSON.parse(query);
        }
        catch(e) {
            console.error(e.stack);
            res.end();
            return;
        }
    }
    const cmd = query.cmd;

    if (!cmd)
        res.json({ ret : false, reason : 'no cmd' });
    else
        COMMUNICATE_D.dispatchCommand(req, res, query);

    // 리포지토리를 보낼 때 연결이 끊어졌는지 검사할 수 있도록 연결 끊기 사건에 주목하여 표시 설정
    res.on('close', function(){
        console.log("connection closed.");
        res.isClosed = true;
    });
});

// 클라이언트 요청 post http://localhost:3000/cmd
// {a:1,b:2}
router.post('/', (req, res, next) => {
    let body = req.body;
    if (typeof(body) === 'string')
    {
        try {
            body = JSON.parse(body);
        }
        catch(e) {
            console.error(e.stack);
            res.end();
            return;
        }
    }
    const cmd = body.cmd;
    if (!cmd)
        res.json({ ret : false, reason : 'no cmd' });
    else
        COMMUNICATE_D.dispatchCommand(req, res, body);

    // 리포지토리를 보낼 때 연결이 끊어졌는지 검사할 수 있도록 연결 끊기 사건에 주목하여 표시 설정
    res.on('close', function(){
        console.log("connection closed.");
        res.isClosed = true;
    });
});

module.exports = router;