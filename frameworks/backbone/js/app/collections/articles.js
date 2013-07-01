define(['models/article'], function(Article) {
  return Backbone.Collection.extend({
    url: "/articles",
    model: Article
  });
});