define(['models/user', 'vendor/jquery/jquery.serializeObject'], function(User, SerializeObject) {
  return UserSignUpView = Backbone.View.extend({
    tagName: "div",

    className: "new-user",

    events: {
      "submit form": "createUser"
    },

    initialize: function() {
      this.model = new User;
    },

    html: function() {
      return _.template($('#new-user-form').html(), {});
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
          console.log('- createUser success callback -');
          Dispatcher.trigger('show_flash_message', 'You have been signed up.');
          view.redirectToLogin();
        },
        error: function(user, xhr, options) {
          console.log('- createUser error callback -');
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    }, 

    redirectToLogin: function() {
      app_router.navigate('login', {trigger: true});
    }
  });
});