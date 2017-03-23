import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Chat, Client} from '../both/collections.js';
import { chatTable } from './methods.js';
// IMPORTANT:
// remember that these publications are insecure
// this is just for demo (and article) purposes
// you can check out production ready app here: https://github.com/juliancwirko/s-chat-app

Meteor.publish('Client.appsList', () => Client.find());

Meteor.publish('Chat.list', (clientAppId) => {
    check(clientAppId, String);
    return chatTable.find({name: clientAppId});
});

Meteor.publish('Chat.messagesList', (clientAppId, userSessionId) => {
    check(clientAppId, String);
    check(userSessionId, Match.Optional(String));
    return chatTable.find({name: clientAppId});
});
// {clientAppId: clientAppId, userSessionId: userSessionId}, {sort: {date: 1}}
