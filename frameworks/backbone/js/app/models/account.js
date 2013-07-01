define(function() {
  return Backbone.Model.extend({
    urlRoot: "/account",
    url: function() {
      return "/account";
    },

    validate: function(attrs, options) {
      var errors = _.compact([
        this.validates.username.isNotBlank(attrs.username),
        this.validates.email.isAnEmailAddress(attrs.email)
      ]);

      if(errors.length > 0) {
        return errors;
      }
    },

    retrieve: function() {
      var daModel = this;
      this.fetch({
        beforeSend: this.sendAuthentication,
        success: function(model, response, options) {
          daModel.set(response);
        },
        error: function() {
          alert('fail');
        }
      });
    },

    validates: {
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
    },

    sendAuthentication: function(xhr) {
      xhr.setRequestHeader('X-User-Token', current_session.get('token'));
    }
  });
});