import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.Concert_Thread.helpers({
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
