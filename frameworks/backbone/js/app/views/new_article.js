define(['models/article', 'vendor/jquery/jquery.serializeObject'], function(Article, SerializeObject) {
  return UserSignUpView = Backbone.View.extend({
    tagName: "div",

    className: "new-article",

    events: {
      "submit form": "createArticle"
    },

    initialize: function() {
      this.model = new Article;
    },

    html: function() {
      return _.template($('#new-article-form').html(), {});
    },

    render: function() {
      if(!session_manager.loggedIn()) {
        return this.redirectToLogin('Gotta login first yo.');
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

    createArticle: function(e) {
      e.preventDefault();

      var view = this;
      var article_data = this.$('form').serializeObject();

      this.model.save(article_data, {
        beforeSend: this.sendAuthentication,
        success: function(article, response, options) {
          view.redirectToArticles('Article submitted.');
        },
        error: function(article, xhr, options) {
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    },

    sendAuthentication: function(xhr) {
      xhr.setRequestHeader('X-User-Token', current_session.get('token'));
    },

    redirectToLogin: function(message) {
      app_router.navigate('login', {trigger: true});
      if(!_.isUndefined(message)) {
        Dispatcher.trigger('add_message', message);
      }
    },

    redirectToArticles: function(message) {
      app_router.navigate('articles', {trigger: true});
      if(!_.isUndefined(message)) {
        Dispatcher.trigger('add_message', message);
      }
    }
  });
});