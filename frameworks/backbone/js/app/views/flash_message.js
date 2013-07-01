define([], function() {
  return Backbone.View.extend({
    tagName: "div",

    className: "alert",

    // render: function() {
    //   if(this.message) {
    //     this.$el.html(message));
    //   }
    //   return this;
    // },

    initialize: function(params) {
      this.message = params.message;
    },

    render: function() {
      this.$el.html(this.message);
      return this.$el;
    },

    toHtml: function() {
      if(this.message) {
        return this;
        // console.log(this.$el.html(this.message));
        // return this.$el.html(this.message);
      }
    }
  });
});