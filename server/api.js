Logger = Npm.require('winston');

Meteor.methods({
  'clientLog': function(level, msg, event){
    event = event || {};
    _.extend(event, {
      userId: this.userId,
      serverDate: new Date,
      clientIp: this.connection.clientAddress
    });
    Logger.log(level, msg, event);
  }
});
