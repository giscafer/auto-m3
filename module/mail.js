'use strict'

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const util = require('util');
const config = require('./config');


const mail_opts = config.mail_opts;

const transport = mailer.createTransport(smtpTransport(mail_opts));

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data) {
    transport.sendMail(data, function (err) {
        if (err) {
            // 写为日志
            console.error(err);
        }
    });
}


/**
 * 发送错误通知邮件
 * @param {String} who 接收人的邮件地址
 */
function sendErrorMail(who, message) {
    var from = util.format('%s <%s>', 'auto-m3', mail_opts.auth.user);
    var to = who;
    var subject = '签到失败咯！！！';
    var html = '<p>错误原因：</p>' +
        '<p>' + message + '</p>';
    sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
}

/**
 * 发送成功通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} type
 */
function sendSuccessMail(who, type) {
    var from = util.format('%s <%s>', 'auto-m3', mail_opts.auth.user);
    var to = who;
    var subject = '签到成功！';
    var html = `<p>已自动 ${type === 1 ? '签到' : '签退'}</p>`
    sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { sendErrorMail, sendSuccessMail };