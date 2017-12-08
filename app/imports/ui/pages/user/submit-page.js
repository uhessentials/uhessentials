import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Topics } from '/imports/api/topic/TopicCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedThreadsKey = 'selectedThreads';

Template.Submit_Page.onCreated(function onCreated() {
  this.subscribe(Topics.getPublicationName());
  this.subscribe(Threads.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(selectedThreadsKey, undefined);
  this.context = Topics.getSchema().namedContext('Submit_Page');
});

Template.Submit_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  topic() {
    return Topics.findDoc(FlowRouter.getParam('username'));
  },
  threads() {
    return _.map(Threads.findAll(),
        function makeThreadObject(thread) {
          return {
            label: thread.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedThreadsKey), thread.name),
          };
        });
  },
});

Template.Submit_Page.events({
  'submit .submit-data-form'(event, instance) {
    event.preventDefault();
    const title = event.target.Title.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const selectedThreads = _.filter(event.target.Threads, (option) => option.selected);
    const threads = _.map(selectedThreads, (option) => option.value);
    const info = event.target.Info.value;

    const updatedSubmitData = { title, username, threads, info };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Topics.getSchema().clean(updatedSubmitData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Topics.findDoc(FlowRouter.getParam('username'))._id;
      const id = Topics.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

