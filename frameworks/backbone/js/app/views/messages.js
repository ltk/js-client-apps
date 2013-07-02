define(['models/message'], function(Message) {
  return Backbone.View.extend({
    el: ".flash",
    template: _.template($('#messages').html()),

    initialize: function() {
      app_router.bind('route', this.render, this);
      messages.bind('add', this.render, this);
    },

    render: function() {
      this.$el.html(this.template());
      messages.destroyAll();
      return this;
    }
  });
});