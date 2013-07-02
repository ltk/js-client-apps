requirejs.config({
  baseUrl: '/js',

  paths: {
    backbone:   'vendor/backbone/backbone',
    jquery:     'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',

    collections: 'app/collections',
    models:      'app/models',
    routers:     'app/routers',
    views:       'app/views'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['backbone'], function() {
  require(['routers/app', 'models/session', 'collections/messages', 'views/messages', 'vendor/jquery/jquery.storage'], function(AppRouter, Session, Messages, MessagesView, LocalStorage) {
    Dispatcher = _.extend({}, Backbone.Events);

    session_manager = {
      updateAttributes: function(event) {
        $.localStorage(this.persistenceKey, event.attributes);
      },

      persistedAttributes: function() {
        return $.localStorage(this.persistenceKey);
      },

      persistenceKey: 'backbode/session/token',

      loggedIn: function() {
        if(!_.isUndefined(current_session)) {
          var current_token = current_session.get('token');
          if(!_.isUndefined(current_token) && current_token) {
            return true;
          }
        }
        return false;
      }
    };

    current_session = new Session(session_manager.persistedAttributes());
    current_session.on('change', session_manager.updateAttributes, session_manager);

    app_router = new AppRouter();

    messages = new Messages();
    var messagesView = new MessagesView();

    Backbone.history.start({
      pushState: false
    });
  });
});