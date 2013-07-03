define(['models/article'], function(Article) {
  return Backbone.Collection.extend({
    url: "/articles",
    model: Article,
    comparator: function(article1, article2) {
      var article1_timestamp = article1.get('updated_at');
      var article2_timestamp = article2.get('updated_at');

      if (article1_timestamp > article2_timestamp) {
        return -1;
      } else if(article2_timestamp > article1_timestamp) {
        return 1;
      }
      return 0;
    }
  });
});
