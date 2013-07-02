define(['models/article'], function(Article) {
  return Backbone.Collection.extend({
    url: "/articles",
    model: Article,
    comparator: function(article) {
      return -article.get('timestamp');
    }
  });
});