define(function() {
  return Backbone.Model.extend({
    urlRoot: "/session",

    initialize: function() {
      // attempt to get the stuff from localstorage
      // console.log('session initialized');
      // this.bind('save', this.persistSession);
      // this.bind('destroy', this.unpersistSession);
    },

    hasToken: function() {
      var token = this.get('token');

      if(token && token.lenth > 0) {
        return true;
      }

      return false;
    },

    validate: function(attrs, options) {
      var errors = _.compact([
        this.validates.email.isAnEmailAddress(attrs.email),
        this.validates.password.isNotBlank(attrs.password)
      ]);

      if(errors.length > 0) {
        return errors;
      }
    },

    validates: {
      password: {
        isNotBlank: function(password) {
          if(!password || password.length == 0) {
            return "You must provide a password.";
          }
        }
      },

      email: {
        isAnEmailAddress: function(email) {
          var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!email_regex.test(email)) {
            return "You must provide a valid email address.";
          }
        }
      }
    },

    // persistedSession: function() {
    //   $.localStorage(this.persistenceKey);
    // },

    // persistSession: function(event) {
    //   console.log('in persistSession');
    //   console.log(event);
    //   var token = "blah";
    //   $.localStorage(this.persistenceKey, token);
    // }, 

    // unpersistSession: function() {
    //   $.localStorage(this.persistenceKey, null);
    // },

    // persistenceKey: 'backbode/session/token'
  });
});