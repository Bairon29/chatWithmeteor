import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Chat, Client, Banned} from '../both/collections.js';
var chatRoom = new Meteor.Streamer('chats');
chatRoom.allowRead('all');
  chatRoom.allowWrite('all');
var db = require('mysql');
// import { chatTable } from './publications.js';
// IMPORTANT:
// remember that these methods are insecure
// this is just for demo (and article) purposes
// you can check out production ready app here: https://github.com/juliancwirko/s-chat-app
var connectingToMysql = {
  host: 'localhost',
  user: 'root',
  password: 'ThisTime',
  database: 'wrevelchat'
};
const mysqldb = db.createPool(connectingToMysql, {retransmitToSelf: true});
// const chatTable = mysqldb.table('chat');
// console.log("database", mysqldb);
// console.log("this is chat table", chatTable['_connection']['tables'][0]['_selectQuery']);
Meteor.methods({
    addClientApp(name) {
        check(name, String);
        currentName = {name: 'bairon'};
        var data;
        // chatTable.insert(currentName);
    mysqldb.getConnection(function(err, connection) {
  // Use the connection
  connection.query('INSERT INTO chat SET ?',{name: 'bairon'}, function (error, results, fields) {
    // And done with the connection.
    // console.log(results)
    // connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });

 connection.query('SELECT * FROM chat', function (error, results, fields) {
    // And done with the connection.
    // console.log(results)
    // connection.release();
    data = results;
    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});
    // chatRoom.emit('name', {name: data})
    },
    addChatMessage(msg, clientAppId, userSessionId) {
        check(msg, String);
        check(clientAppId, String);
        check(userSessionId, String);
        // chatTable.insert({
        //     name: msg
        //     // clientAppId: clientAppId,
        //     // userSessionId: userSessionId,
        //     // date: new Date()
        // });
    },
    getAll(){
      var name;
      if(name){
        return name;
      }
      else{
          mysqldb.getConnection(function(err, connection) {
     connection.query('SELECT * FROM chat', function (error, results, fields) {
    // And done with the connection.
    // console.log(results.RowDataPacket.name);
    // connection.release();
    name = results;
    console.log('im here where it is ', name[0].name);
    // Handle error after the release.
    if (error) throw error;
// return name;
    // Don't use the connection here, it has been returned to the pool.
  });
   });
        }
        return "haahhah";
          console.log('is it getting here?');
          // return name;
    }
});

// export chatTable;
