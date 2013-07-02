define(['models/user', 'vendor/jquery/jquery.serializeObject'], function(User, SerializeObject) {
  return UserSignUpView = Backbone.View.extend({
    tagName: "div",
    className: "new-user",
    template: _.template($('#new-user-form').html()),

    events: {
      "submit form": "createUser"
    },

    initialize: function() {
      this.model = new User;
    },

    html: function() {
      return this.template();
    },

    render: function() {
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

    createUser: function(e) {
      e.preventDefault();

      var view = this;
      var user_data = this.$('form').serializeObject();

      this.model.save(user_data, {
        success: function(user, response, options) {
          view.redirectToLogin('You have been signed up.');
        },
        error: function(user, xhr, options) {
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    }, 

    redirectToLogin: function(message) {
      app_router.navigate('login', {trigger: true});
      if(!_.isUndefined(message)) {
        Dispatcher.trigger('add_message', message);
      }
    }
  });
});