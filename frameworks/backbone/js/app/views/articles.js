define(['collections/articles' ,'vendor/jquery/jquery.timeago'], function(Articles, Timeago) {
  return Backbone.View.extend({
    el: '.page',
    template: _.template($('#articles').html()),
    render: function() {
      var view = this;
      var articles = new Articles;
      articles.fetch({
        success: function(articles) {
          articles.sort();
          var articles_html = view.template({articles: articles.models});
          view.$el.html(articles_html);
          $('abbr.timeago').timeago();
        }
      });
      return this;
    }
  });
});