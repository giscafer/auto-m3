
const handle = require('./handle');
const config = require('./config');


const getOptions = (JSESSIONID, type) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'JSESSIONID': JSESSIONID,
        "Cookie": `JSESSIONID=${JSESSIONID}`,
    },
    body: JSON.stringify({
        "continent": "",
        "country": "中国",
        "province": "广东省",
        "city": "广州市",
        "town": "天河区",
        "street": "陶庄路",
        "nearAddress": "广州一智通供应链管理有限公司",
        "longitude": "113.320371",
        "latitude": "23.162446",
        "sign": "广东省广州市天河区广州一智通供应链管理有限公司",
        "deviceId": "te",
        "remark": "11",
        "receiveIds": "",
        "fileIds": [],
        "source": 2,
        "type": type || 1  // 签到1，签退2
    })
})

/**
 * 签到请求
 * @param {*} JSESSIONID 登录token
 * @param {*} type 签到类型
 */
const attendance = (JSESSIONID, type) => {
    const options = getOptions(JSESSIONID, type);
    console.log(options)
    const url = `http://193.112.250.216:9999/mobile_portal/seeyon/rest/attendance/save`;
    console.log(url)
    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            if (response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return [];
        }).then(json => {
            if (json.code !== '200') {
                return reject(json);
            }
            return resolve(json.data.ticket);

        }).catch(err => {
            console.log('接口请求异常');
            return reject(err);
        });
    });
}

// test
// attendance().then(res => console.log(res)).catch(err => console.log(err));

module.exports = attendance;