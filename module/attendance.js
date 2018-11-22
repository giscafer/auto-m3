
const config = require('./config');


const getOptions = ({ JSESSIONID, type, longitude, latitude }) => ({
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
        "longitude": longitude,
        "latitude": latitude,
        "sign": "广东省广州市天河区广州一智通供应链管理有限公司",
        "deviceId": "te",
        "remark": "",
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

    let longitude = `113.3203${Math.ceil(Math.random() * 10)}`;
    let latitude = `23.16244${Math.ceil(Math.random() * 10)}`;

    const options = getOptions({ JSESSIONID, type, latitude, longitude });
    const url = `${config.apiurl}/seeyon/rest/attendance/save`;

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            if (response.headers.get('content-type').match(/application\/json/)) {
                return response.json();
            }
            return [];
        }).then(json => {
            if (!json.success) {
                return reject(json);
            }
            return resolve(json);

        }).catch(err => {
            console.log('接口请求异常');
            return reject(err);
        });
    });
}

// test
// attendance().then(res => console.log(res)).catch(err => console.log(err));

module.exports = attendance;