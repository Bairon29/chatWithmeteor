import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Chat, Client, Banned} from '../both/collections.js';

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
const mysqldb = Mysql.connect(connectingToMysql);
const chatTable = mysqldb.table("chat");

Meteor.methods({
    addClientApp(name) {
        check(name, String);
        Client.insert({name: name});
    },
    addChatMessage(msg, clientAppId, userSessionId) {
        check(msg, String);
        check(clientAppId, String);
        check(userSessionId, String);
        chatTable.insert({
            name: msg,
            // clientAppId: clientAppId,
            // userSessionId: userSessionId,
            // date: new Date()
        });
    }
});

// export chatTable;
