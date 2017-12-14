import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';


/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});

/*                        USER ROUTES                      */


function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const homePageRouteName = 'Home_Page';
userRoutes.route('/home', {
  name: homePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: homePageRouteName });
  },
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const submitPageRouteName = 'Submit_Page';
userRoutes.route('/submit', {
  name: submitPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: submitPageRouteName });
  },
});

export const commutePageRouteName = 'Commute_Thread';
userRoutes.route('/commute', {
  name: commutePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: commutePageRouteName });
  },
});

export const degreePageRouteName = 'Degree_Thread';
userRoutes.route('/degree', {
  name: degreePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: degreePageRouteName });
  },
});

export const eventsPageRouteName = 'Events_Thread';
userRoutes.route('/events', {
  name: eventsPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: eventsPageRouteName });
  },
});

export const foodPageRouteName = 'Food_Thread';
userRoutes.route('/food', {
  name: foodPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: foodPageRouteName });
  },
});

export const securityPageRouteName = 'Security_Thread';
userRoutes.route('/security', {
  name: securityPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: securityPageRouteName });
  },
});

export const topicPageRouteName = 'Topic_Page';
userRoutes.route('/topic', {
  name: topicPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: topicPageRouteName });
  },
});


/*                        ROUTES FOR EVENTS THREAD TOPICS                     */
export const concertPageRouteName = 'Concert_Thread';
userRoutes.route('/event/concert', {
  name: concertPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: concertPageRouteName });
  },
});

export const sportsPageRouteName = 'Sports_Thread';
userRoutes.route('/event/sports', {
  name: sportsPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: sportsPageRouteName });
  },
});

export const bookstorePageRouteName = 'Bookstore_Thread';
userRoutes.route('/bookstore', {
  name: bookstorePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: bookstorePageRouteName });
  },
});

/*                        ROUTES FOR SECURITY THREAD TOPICS                     */
export const officePageRouteName = 'Office_Thread';
userRoutes.route('/office', {
  name: officePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: officePageRouteName });
  },
});

export const polesPageRouteName = 'Poles_Thread';
userRoutes.route('/poles', {
  name: polesPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: polesPageRouteName });
  },
});

/*                        ROUTES FOR COMMUTE THREAD TOPICS                     */

/*                        ROUTES FOR DEGREE THREAD TOPICS                     */

/*                        ROUTES FOR FOOD THREAD TOPICS                     */


/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
