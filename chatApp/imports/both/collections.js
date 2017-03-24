import { Mongo } from 'meteor/mongo';

export const Chat = new Mongo.Collection('chat');
export const Client = new Mongo.Collection('client');
var db = require('mysql');



var connectingToMysql = {
  host: 'localhost',
  user: 'root',
  password: 'ThisTime',
  database: 'wrevelchat'
};
export const mysqldb = db.createPool(connectingToMysql);
