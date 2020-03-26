const express = require('express');
const router = express.Router();
const crypto = require("crypto-js");
const axios = require( 'axios/index');

const makeSignatureValue = (key, str) => {
    // 암호화 객체 생성, sha256 알고리즘 선택
    const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, key);

    hmac.update(str);

    const hash = hmac.finalize();

    return hash.toString(crypto.enc.Base64);
};

const requestSMS = () => {
    // SMS API v2 아직 사용 못함
    // const url = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:256098580955:mathdosa/messages';
    const url = 'https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:256098580955:mathdosa/messages';
    const contentTypeValue = 'application/json; charset=utf-8';
    const accessKeyValue = '0fGCT6N7I08NqgJ6MUek';
    const timestampValue = new Date().getTime();
    const secretKeyValue = '83278a4ea0514e93805b3af11003f0ac';
    const test = 'POST /sms/v2/services/ncp:sms:kr:256098580955:mathdosa/messages\napplication/json\n' + timestampValue + '\n0fGCT6N7I08NqgJ6MUek';
    const signature = makeSignatureValue(secretKeyValue, test);

    /* SMS API v2 아직 사용 못함
    const config = {
        headers: {
            'Content-Type': contentTypeValue,
            'x-ncp-apigw-timestamp': timestampValue,
            'x-ncp-iam-access-key': accessKeyValue,
            'x-ncp-apigw-signature-v2': signature,
        }
    }
    */

    const config = {
        headers: {
            'Content-Type': contentTypeValue,
            'x-ncp-auth-key': accessKeyValue,
            'x-ncp-service-secret': secretKeyValue,
        }
    }

    axios.post(url, {

        /* SMS API v2 아직 사용 못함
        'type':'SMS',
        'contentType':'COMM',
        'countryCode':'82',
        'from':'01067815339',
        'content':'내용',
        'messages':[
            {
                'to':'01067815339',
                'content':'위의 content와 별도로 해당 번호로만 보내는 내용(optional)'
            }
        ]
        */

        'type':'SMS',
        'contentType':'COMM',
        'countryCode':'82',
        'from':'01067815339',
        'to':[
        '01067815339'
        ],
        'subject':'hi',
        'content':'mo'

    }, config)
        .then( response => { console.log(response) } )
        .catch( response => { console.log(response) } );
};

router.post('/', (req, res, next) => {
    requestSMS();
    res.json({login: true});
});

module.exports = router;