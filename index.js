/*
 * @Discription:
 * @Author: giscafer
 * @Date:   2018-11-10 20:06:44
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const CronJob = require('cron').CronJob;
const login = require('./module/login');
const attendance = require('./module/attendance');
const mail = require('./module/mail');
const config = require('./module/config');
const handle = require('./module/handle');

/**
*  Crontab 的格式说明如下:
* 逗号(',') 指定列表值。如: "1,3,4,7,8"
* 中横线('-') 指定范围值 如 "1-6", 代表 "1,2,3,4,5,6"
* 星号 ('*') 代表所有可能的值
Linux(开源系统似乎都可以)下还有个 "/" 可以用. 在 Minute 字段上，`*\/15`
 表示每 15 分钟执行一次. 而这个特性在商业 Unix ，比如 AIX 上就没有.
* Use the hash sign to prefix a comment 
* +---------------- minute (0 - 59) 
* |  +------------- hour (0 - 23) 
* |  |  +---------- day of month (1 - 31) 
* |  |  |  +------- month (1 - 12) 
* |  |  |  |  +---- day of week (0 - 7) (Sunday=0 or 7) 
* |  |  |  |  | * *  *  *  *  *  command to be executed
*/

// 定时任务执行
// 自动打卡上班
// 每周一到周五，8点49分~9点整之间签到
let jobMorning = new CronJob(
	`51 8 * * 1-5`,
	() => {
		const min = Math.ceil(Math.random() * 10);
		setTimeout(() => {
			autoSign(1);
		}, min * 60 * 1000);
	},
	null,
	true,
	'Asia/Shanghai'
);

// 自动打卡下班
// 每周一到周五，20点00分~10分之间自动签到
let jobNight = new CronJob(
	`11 20 * * 1-5`,
	() => {
		const min2 = Math.ceil(Math.random() * 20); //${min2}
		setTimeout(() => {
			autoSign(2);
		}, min2 * 60 * 1000);
	},
	null,
	true,
	'Asia/Shanghai'
);

// let job2 = new CronJob('*/5 * * * * *', () => {
//     // autoSign(type);
// }, null, true, 'Asia/Shanghai');

jobMorning.start();
jobNight.start();
console.log('job started');

/**
 * 自动登录签到
 * @param {number} type 1签到，2签退
 */
async function autoSign(type) {
	const [loginError, token] = await handle(login());

	if (loginError || !token) {
		console.log('login error');
		return mail.sendErrorMail(config.reveiveEmail, loginError.msg);
	}
	console.log(token);
	const [attendanceErr, result] = await handle(attendance(token, type));

	if (attendanceErr || !result) {
		console.log('attendance error');
		console.log(attendanceErr);
		return mail.sendErrorMail(config.reveiveEmail, attendanceErr.msg);
	}
	console.log('成功！' + new Date());
	return mail.sendSuccessMail(config.reveiveEmail, type);
}

//test
// autoSign(1);
