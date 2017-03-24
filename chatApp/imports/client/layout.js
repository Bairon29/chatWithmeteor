import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import { Chat, Client} from '../both/collections.js';
var db = require('mysql');

var chatRoom = new Meteor.Streamer('chats', {retransmitToSelf: true});

var connectingToMysql = {
  host: 'localhost',
  user: 'root',
  password: 'ThisTime',
  database: 'wrevelchat'
};
 const mysqldb = db.createPool(connectingToMysql);
// this is just for demo (and article) purposes
// you can check out production ready app here: https://github.com/juliancwirko/s-chat-app

// we can import html templates here
import './layout.html';

// we need a state management we will use reactive-dict (https://atmospherejs.com/meteor/reactive-dict)
// it could be imported from some kind of global state
// here we just use local dictionary
// you can also use ReactiveVar if you want (https://atmospherejs.com/meteor/reactive-var)
const state = new ReactiveDict('');
state.setDefault({
    openedChat: '',
    openedApp: ''
});
console.log("in layout");
// Main template
// We need to subscribe to the data - here client apps and particular chats in the context of the chosen app
Template.main.onRendered(function () {
    const instance = this;
    instance.subscribe('Client.appsList');
    instance.autorun(() => {
        instance.subscribe('Chat.list', state.get('openedApp'));
    });
chatRoom.emit('name', {name: 'slslslslslsl'});
});
// We configure 'add-new-app' onClick event here
Template.main.events({
    'click .js-add-new-client-app'() {
        const instance = Template.instance();
        const name = instance.$('[name=client-app-name]').val();
        if (name) {

            Meteor.call('addClientApp', name);
            instance.$('[name=client-app-name]').val('');
        }

    }

});

// We prepare data helpers in the main template
Template.main.helpers({

    clientApps() {
var name;

chatRoom.on('name', function(name){
              console.log("live on")
              instance.$('#here-plz').val('ffff');
            })




        // return Client.find();
     //    console.log(Session.set('server'));
     // return Session.set('server');

     //     // console.log('hey '+Meteor.call('getAll'));
     //     console.log('hey ' + name);
     //     return name;
    },
    clientAppsChatsSessions() {
        var sss = Chat.find({clientAppId: state.get('openedApp')})
            .fetch()
            .map(c => c.userSessionId)
            .filter((v, i, s) => s.indexOf(v) === i);
        return sss;
    },
    chatBoxOpened() {
        return state.get('openedChat');
    }
});

// Client App item template
// We set up chosen appId here
Template.appItem.events({
    'click .js-open-chats'(e) {
        e.preventDefault();
        const data = Template.currentData();
        state.set('openedApp', data.id);
        state.set('openedChat', '');
    }
});

// Chat item template
// We set up opened chatBox by userSessionId
Template.chatItem.events({
    'click .js-open-chat-messages'(e) {
        e.preventDefault();
        const data = Template.currentData();
        state.set('openedChat', data.userSessionId);
    }
});

// Chat box with messages template
// We render chatBox and subscribe to the messeges in the context of a single userSessionId
Template.chatBox.onRendered(function () {
    const instance = Template.instance();
    instance.autorun(() => {
        instance.subscribe('Chat.messagesList', state.get('openedApp'), state.get('openedChat'));
    });
});
// We populate the messages data
Template.chatBox.helpers({
    messages() {
        return Chat.find({clientAppId: state.get('openedApp'), userSessionId: state.get('openedChat')}, {sort: {date: 1}});
    },
    userSessionId() {
        return state.get('openedChat');
    }
});
// We attach onKeydown event to be able to send new messages
Template.chatBox.events({
    'keydown .js-chat-submit-input'(e) {
        const instance = Template.instance();
        const msg = instance.$('.js-chat-submit-input').val();
        const key = e.keyCode || e.which;
        if (key === 13 && !e.shiftKey) {
            e.preventDefault();
            if (msg.trim() !== '') {
                Meteor.call('addChatMessage', msg, state.get('openedApp'), state.get('openedChat'));
                $(e.currentTarget).val('');
            }
        }
    }
})
