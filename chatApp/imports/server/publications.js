import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Chat, Client, mysqldb} from '../both/collections.js';
var db = require('mysql');
// import { chatTable } from './methods.js';
// IMPORTANT:
// remember that these publications are insecure
// this is just for demo (and article) purposes
// you can check out production ready app here: https://github.com/juliancwirko/s-chat-app

// var connectingToMysql = {
//   host: 'localhost',
//   user: 'root',
//   password: 'ThisTime',
//   database: 'wrevelchat'
// };
// const mysqldb = db.createPool(connectingToMysql);
// const chatTable = mysqldb.table("chat");
// export chatTable;
Meteor.publish('Client.appsList', () => Client.find());

Meteor.publish('Chat.list', (clientAppId) => {
    check(clientAppId, String);
    // return chatTable.FIND({name: 'bairon'});
     var re;
    // return chatTable.FIND({name: clientAppId});
    mysqldb.getConnection(function(err, connection) {
     connection.query('SELECT * FROM chat', function (error, results, fields) {
    // And done with the connection.
    // console.log(results)
    // connection.release();
    re = results;
    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
   });
     return re;
});

Meteor.publish('Chat.messagesList', (clientAppId, userSessionId) => {
    check(clientAppId, String);
    check(userSessionId, Match.Optional(String));
    var re;
    // return chatTable.FIND({name: clientAppId});
    mysqldb.getConnection(function(err, connection) {
     connection.query('SELECT * FROM chat', function (error, results, fields) {
    // And done with the connection.
    // console.log(results)
    // connection.release();
    re = results;
    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
     connection.release();
   });
     return re;
});
// {clientAppId: clientAppId, userSessionId: userSessionId}, {sort: {date: 1}}
