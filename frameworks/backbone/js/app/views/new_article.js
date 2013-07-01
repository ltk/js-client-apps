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
        alert('gotta login first');
        return this.redirectToLogin();
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
          console.log('- createarticle success callback -');
          Dispatcher.trigger('show_flash_message', 'Article submitted.');
          view.redirectToArticles();
        },
        error: function(article, xhr, options) {
          console.log('- createarticle error callback -');
          var errors = $.parseJSON(xhr.responseText).errors;
          view.renderErrors(errors);
        }
      });
    },

    sendAuthentication: function(xhr) {
      xhr.setRequestHeader('X-User-Token', current_session.get('token'));
    },

    redirectToLogin: function() {
      app_router.navigate('login', {trigger: true});
    },

    redirectToArticles: function() {
      app_router.navigate('articles', {trigger: true});
    }
  });
});