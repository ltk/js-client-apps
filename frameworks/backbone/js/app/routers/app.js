define(
[
  'views/new_user',
  'views/account',
  'views/edit_account',
  'views/new_session',
  'views/articles',
  'views/new_article',
  'views/account_nav_links',
  'views/messages'
],
function(
  NewUserView,
  AccountView,
  EditAccountView,
  NewSessionView,
  ArticlesView,
  NewArticleView,
  AccountNavLinks,
  MessagesView
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
      new AccountNavLinks().render().$el;
    }
  });

  return AppRouter;
});