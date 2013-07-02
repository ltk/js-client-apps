define(['models/message'], function(Message) {
  return Backbone.Collection.extend({
    initialize: function() {
      Dispatcher.bind('add_message', this.addMessage, this);
    },
    model: Message,
    destroyAll: function() {
      console.log('message destroyed');
      var promises = [];

      while(this.models.length > 0) {
        promises.push( this.models[0].destroy() );
      }
    },
    addMessage: function(message) {
      console.log('message added');
      var new_message = new Message({text: message});
      this.add([new_message]);
    }
  });
});