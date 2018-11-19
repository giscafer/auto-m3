module.exports = {
    apiurl: 'http://giscafer.com/mobile_portal', // m3 app后端接口统一地址，改为你的
    deviceId: "55EA49EB-7845-47F6-9D70-CB968F3001DE", // 手机id，每个手机都有唯一ID，可以随写
    login: {
        name: "giscafer", // oa账号
        password: "i am giscafer" // 密码
    },
    reveiveEmail: 'test@outlook.com', // 邮件通知对象，签到信息（成功，失败都发送）
    /* mail.js邮件发送者账号信息，此邮件发送到reveiveEmail */
    mail_opts: {
        host: 'smtp.163.com', // 如果不是163请改这里
        port: 25, // 如果不是163 可能也要改这里
        auth: {
            user: 'test@163.com', // 邮箱账号
            pass: 'password1111' // 密码
        }
    }
};
