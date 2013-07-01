define([], function() {
  return Backbone.View.extend({
    tagName: "ul",

    className: "account-nav nav pull-right",

    initialize: function() {
    },

    html: function() {
      return _.template($('#account-nav-links').html(), {});
    },

    render: function() {
      $('div.account-nav').html(this.$el.html(this.html()));
      return this;
    }
  });
});