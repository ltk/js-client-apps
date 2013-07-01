define(function() {
  var User = Backbone.Model.extend({
    urlRoot: "/users",
    validate: function(attrs, options) {
      var errors = _.compact([
        this.validates.username.isNotBlank(attrs.username),
        this.validates.email.isAnEmailAddress(attrs.email),
        this.validates.password.isNotBlank(attrs.password),
        this.validates.password.matchesConfirmation(attrs.password, attrs.password_confirmation)
      ]);

      if(errors.length > 0) {
        return errors;
      }
    },

    validates: {
      password: {
        matchesConfirmation: function(password, confirmation) {
          if(password !== confirmation) {
            return "Your password must match the confirmation.";
          }
        },
        isNotBlank: function(password) {
          if(!password || password.length == 0) {
            return "You must provide a password.";
          }
        }
      },
      username: {
        isNotBlank: function(username) {
          if(!username || username.length == 0) {
            return "You must provide a username.";
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
    }
  });

  return User;
});