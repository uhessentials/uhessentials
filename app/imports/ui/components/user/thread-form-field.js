import { Template } from 'meteor/templating';

Template.Threads_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

