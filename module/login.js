

const handle = require('./handle');
const config = require('./config');


const options = {
    method: 'post',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
        "timezone": "GMT+8",
        "deviceCode": config.deviceId,
        "client": "iphone",
        "name": config.login.name,
        "password": config.login.password,
    })
};

/* 登录 */
const login = () => {
    const url = `${config.apiurl}/api/verification/login`
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


// login().then(res => console.log(res)).catch(err => console.log(111));

module.exports = login;