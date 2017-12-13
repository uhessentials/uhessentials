import { Template } from 'meteor/templating';

Template.Campuses_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});
