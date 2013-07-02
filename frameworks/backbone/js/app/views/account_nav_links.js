define([], function() {
  return Backbone.View.extend({
    tagName: "ul",
    className: "account-nav nav pull-right",
    template: _.template($('#account-nav-links').html()),

    initialize: function() {
    },

    html: function() {
      return this.template();
    },

    render: function() {
      $('div.account-nav').html(this.$el.html(this.html()));
      return this;
    }
  });
});