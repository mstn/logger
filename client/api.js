Logger = {};

_.each(['info', 'error', 'warn', 'trace'], function(level){
  Logger[level] = function (msg, event, callback) {
    debug(level, msg, event);
    Logger.log(level, msg, event, callback);
  };
});

Logger._handlers = {};

var applyLogHandlers = function(event){
  _.each(Logger._handlers, function(handler){
    event = handler(event);
  });
  return event;
};

var debug = function(level, msg, event){
  if (Logger.debug){
    switch(level){
      case 'error':
        console.error(msg, event);
        break;
      case 'warn':
        console.warn(msg, event);
        break;
      default:
        console.debug(msg, event);
    }
  }
};

/**
 *  available options
 *
 *     unhandledErrors:false
 *     debug:false
 */
Logger.config = function(options){
  options = options || {};

  if (options.unhandledErrors){
    Logger.catchUnhandledErrors();
  }

  this.debug = options.debug;
};

Logger.add = function(name, handler){
  this._handlers[ name ] = handler;
};

Logger.add('addClientDate', function(event){
  return _.extend(event,{
    clientDate: new Date
  });
});

Logger.log = function (level, msg, event, callback) {
  event = event || {};
  event = applyLogHandlers(event);
  Meteor.call('clientLog', level, msg, event, callback);
};


// catch all client unhandled exception
// TODO does it work in Cordova?
// from https://www.loggly.com/blog/managing-a-meteor-application-in-production-three-real-log-management-use-cases/

// how to trigger it in Chrome
// http://stackoverflow.com/questions/16192464/window-onerror-not-working-in-chrome
Logger.catchUnhandledErrors = function(){
  window.onerror = function (errorMsg, url, lineNumber) {
    Logger.error(errorMsg, {
      url:url,
      lineNumber:lineNumber,
      errorMsg:errorMsg
    });
    return true;
  };
};
