define(['models/session', 'vendor/jquery/jquery.serializeObject'], function(Session, SerializeObject) {
  return Backbone.View.extend({
    tagName: "div",

    className: "new-session",

    events: {
      "submit form": "createSession"
    },

    initialize: function() {
      this.model = current_session;

      // if(this.model.hasToken) {
      //   return this.redirectToHome();
      // }
    },

    html: function() {
      return _.template($('#new-session-form').html(), {});
    },

    render: function() {
      if(this.model.get('token')) {
        Dispatcher.trigger('show_flash_message', 'You are already logged in.');
        return this.redirectToHome();
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
          console.log('- createSession success callback -');
          session.set({token: response.token, password: null});
          Dispatcher.trigger('show_flash_message', 'You have been logged in.');
          view.redirectToHome();
        },
        error: function(session, xhr, options) {
          console.log('- createSession error callback -');
          session.set({password: null});
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    }, 

    redirectToHome: function() {
      return app_router.navigate('', {trigger: true});
    }
  });
});