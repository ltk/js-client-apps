define(function() {
  return Backbone.Model.extend({
    urlRoot: "/articles",
    validate: function(attrs, options) {
      var errors = _.compact([
        this.validates.title.isNotBlank(attrs.title),
        this.validates.url.isAValidUrl(attrs.url)
      ]);

      if(errors.length > 0) {
        return errors;
      }
    },

    validates: {
      title: {
        isNotBlank: function(title) {
          if(!title || title.length == 0) {
            return "Please provide a title.";
          }
        }
      },
      url: {
        isAValidUrl: function(url) {
          var url_regex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
          if(!url_regex.test(url)) {
            return "Please provide a valid URL.";
          }
        }
      }
    }
  });
});