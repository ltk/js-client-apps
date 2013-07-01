define(['collections/articles'], function(Articles) {
  return Backbone.View.extend({
    el: '.page',
    render: function() {
      var view = this;
      var articles = new Articles;
      articles.fetch({
        success: function(articles) {
          var articles_html = _.template($('#articles').html(), {articles: articles.models});
          view.$el.html(articles_html);
        }
      });

      console.log(articles);

      return this;
    }
  });
});