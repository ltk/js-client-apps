define(
[
  'views/new_user',
  'views/account',
  'views/edit_account',
  'views/homepage',
  'views/new_session',
  'views/articles',
  'views/new_article',
  'views/account_nav_links',
  'views/flash_messages'
],
function(
  NewUserView,
  AccountView,
  EditAccountView,
  HomepageView,
  NewSessionView,
  ArticlesView,
  NewArticleView,
  AccountNavLinks,
  FlashMessages
) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'articles',
      'signup': 'signup',
      'login': 'login',
      'logout': 'logout',
      'articles': 'articles',
      'articles/new': 'newArticle',
      'account': 'account',
      'account/edit': 'editAccount'
    },

    homepage: function() {
      this.renderCommonViews();
      new HomepageView().render().$el;
    },

    signup: function() {
      this.renderCommonViews();
      new NewUserView().render().$el;
    },

    login: function() {
      this.renderCommonViews();
      new NewSessionView().render().$el;
    },

    logout: function() {
      current_session.clear();
      Dispatcher.trigger('show_flash_message', 'You have been logged out.');
      app_router.navigate('', {trigger: true});
    },

    articles: function() {
      this.renderCommonViews();
      new ArticlesView().render().$el;
    },

    newArticle: function() {
      this.renderCommonViews();
      new NewArticleView().render().$el;
    },

    account: function() {
      this.renderCommonViews();
      new AccountView().render();
    },

    editAccount: function() {
      this.renderCommonViews();
      new EditAccountView().render();
    },

    renderCommonViews: function() {
      new FlashMessages().render().$el;
      new AccountNavLinks().render().$el;
    }
  });

  return AppRouter;
});