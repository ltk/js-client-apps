define([], function() {
  return Backbone.View.extend({
    tagName: "div",

    className: "home",

    initialize: function() {
    },

    html: function() {
      return _.template($('#home').html(), {});
    },

    render: function() {
      $(".page").html(this.$el.html(this.html()));
      return this;
    }
  });
});