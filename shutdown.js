/*
 * @Discription:
 * @Author: giscafer
 * @Date:   2018-11-10 20:06:44
 * 关机后自动打卡
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const CronJob = require('cron').CronJob;
const login = require('./module/login');
const attendance = require('./module/attendance');
const mail = require('./module/mail');
const config = require('./module/config');
const handle = require('./module/handle');

// 立即打下班卡，配合关机命令 
autoSign(2);

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
