define(['models/account'], function(Account) {
  return Backbone.View.extend({
    tagName: "div",
    className: "account",
    template: _.template($('#account').html()),

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
      var view = this; 
      this.model.fetch({
        beforeSend: this.model.sendAuthentication,
        success: function(thing, response) {
          $(".page").html(view.$el.html(view.html()));
          return view;
        },
        error: function(thing, response) {
          alert('there was an error');
          return view;
        }
      });
    },

    redirectToLogin: function() {
      app_router.navigate('login', {trigger: true});
    }
  });
});