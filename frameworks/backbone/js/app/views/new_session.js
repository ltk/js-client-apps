define(['models/session', 'vendor/jquery/jquery.serializeObject'], function(Session, SerializeObject) {
  return Backbone.View.extend({
    tagName: "div",
    className: "new-session",
    template: _.template($('#new-session-form').html()),

    events: {
      "submit form": "createSession"
    },

    initialize: function() {
      this.model = current_session;
    },

    html: function() {
      return this.template();
    },

    render: function() {
      if(this.model.get('token')) {
        return this.redirectToHome('You are already logged in.');
      }

      var view = this;

      this.model.on("invalid", function(model, errors) {
        view.renderErrors(errors);
      });

      $(".page").html(this.$el.html(this.html()));
      return this;
    },

    renderErrors: function(errors) {
      this.$el.find('.errors').html(this.errorsHtml(errors));
    },

    errorsHtml: function(errors) {
      return _.template($('#form-errors').html(), {errors: errors});
    },

    createSession: function(e) {
      e.preventDefault();

      var view = this;
      var login_data = this.$('form').serializeObject();
      this.model.clear();
      this.model.save(login_data, {
        success: function(session, response, options) {
          session.set({token: response.token, password: null});
          view.redirectToHome('You have been logged in.');
        },
        error: function(session, xhr, options) {
          session.set({password: null});
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    }, 

    redirectToHome: function(message) {
      app_router.navigate('', {trigger: true});
      if(!_.isUndefined(message)) {
        Dispatcher.trigger('add_message', message);
      }
    }
  });
});