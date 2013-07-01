define(['views/flash_message'], function(FlashMessage) {
  return Backbone.View.extend({
    tagName: "div",

    className: "flash-messages",

    initialize: function() {
      Dispatcher.bind('show_flash_message', this.addMessage, this);
    },

    render: function() {
      $('.flash').append(this.$el.html());
      return this;
    },

    addMessage: function(message) {
      var messageView = new FlashMessage({message: message});
      console.log(messageView.render().html());
      this.$el.append(messageView.render().html());
    }
  });
});