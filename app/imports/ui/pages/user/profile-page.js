import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedCampusesKey = 'selectedCampuses';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Campuses.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
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
  campuses() {
    return _.map(Campuses.findAll(),
        function makeCampusObject(campus) {
          return {
            label: campus.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedCampusesKey), campus.name),
          };
        });
  },
});

Template.Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const title = event.target.Title.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const bio = event.target.Bio.value;
    const selectedCampuses = _.filter(event.target.Campuses.selectedOptions, (option) => option.selected);
    const campuses = _.map(selectedCampuses, (option) => option.value);

    const updatedProfileData = { firstName, lastName, title, campuses, picture, bio, username };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

