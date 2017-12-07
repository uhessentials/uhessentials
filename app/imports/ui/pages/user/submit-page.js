import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
<<<<<<< HEAD
import { Posts } from '/imports/api/post/PostCollection';
=======
>>>>>>> master
import { Threads } from '/imports/api/thread/ThreadCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedThreadsKey = 'selectedInterests';


Template.Submit_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
<<<<<<< HEAD
  this.subscribe(Posts.getPublicationName());
=======
>>>>>>> master
  this.subscribe(Threads.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
<<<<<<< HEAD
  this.context = Posts.getSchema().namedContext('Submit_Page');
=======
  this.messageFlags.set(selectedThreadsKey, undefined);
  this.context = Profiles.getSchema().namedContext('Submit_Page');
>>>>>>> master
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
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  threads() {
<<<<<<< HEAD
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedThreads = profile.threads;
    return profile && _.map(Threads.findAll(),
        function makeThreadObject(thread) {
          return { label: thread.name, selected: _.contains(selectedThreads, thread.name) };
        });
  },
  routeUserName() {
    return FlowRouter.getParam('username');
  },
=======
    return _.map(Threads.findAll(),
        function makeThreadObject(thread) {
          return {
            label: thread.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedThreadsKey), thread.name),
          };
        });
  },
>>>>>>> master
});

Template.Submit.events({
  'submit .submit-data-form'(event, instance) {
    event.preventDefault();
    const subject = event.target.Subject.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const info = event.target.Info.value;
    const selectedThreads = _.filter(event.target.Threads.selectedOptions, (option) => option.selected);
    const threads = _.map(selectedThreads, (option) => option.value);

    const updatedPostData = { username, subject, threads, info };

    const selectedOptions = _.filter(event.target.Threads.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedThreadsKey, _.map(selectedOptions, (option) => option.value));

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Posts.getSchema().clean(updatedPostData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Posts.findDoc(FlowRouter.getParam('username'))._id;
      const id = Posts.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

