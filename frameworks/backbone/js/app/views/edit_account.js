define(['models/account', 'vendor/jquery/jquery.serializeObject'], function(Account, SerializeObject) {
  return Backbone.View.extend({
    tagName: "div",
    className: "edit-account",
    template: _.template($('#edit-account').html()),

    events: {
      "submit form": "updateAccount"
    },

    initialize: function() {
      this.model = new Account();
    },

    html: function() {
      return this.template({account: this.model});
    },

    render: function() {
      if(!session_manager.loggedIn()) {
        alert('gotta login first');
        return this.redirectToLogin();
      }

      this.model.on("invalid", function(model, errors) {
        view.renderErrors(errors);
      });

      var view = this; 
      this.model.fetch({
        beforeSend: this.model.sendAuthentication,
        success: function(thing, response) {
          $(".page").html(view.$el.html(view.html()));
          return view;
        },
        error: function(thing, response) {
          alert('there was an error');
        }
      });
    },

    renderErrors: function(errors) {
      this.$el.find('.errors').html(this.errorsHtml(errors));
    },

    errorsHtml: function(errors) {
      return _.template($('#form-errors').html(), {errors: errors});
    },

    updateAccount: function(event) {
      event.preventDefault();
      var view = this;
      var account_data = this.$('form').serializeObject();
      this.model.unset('points');
      this.model.save(account_data, {
        beforeSend: this.model.sendAuthentication,
        success: function(account, response, options) {
          Dispatcher.trigger('show_flash_message', 'Your changes have been saved.');
          view.redirectToAccount();
        },
        error: function(account, xhr, options) {
          console.log(xhr);
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    },

    redirectToLogin: function() {
      app_router.navigate('login', {trigger: true});
    },

    redirectToAccount: function() {
      app_router.navigate('account', {trigger: true});
    }
  });
});