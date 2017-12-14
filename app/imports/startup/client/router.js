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


export const appPageRouteName = 'App_Thread';
userRoutes.route('/app', {
  name: appPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: appPageRouteName });
  },
});

/*                        ROUTES FOR COMMUTE THREAD TOPICS                     */
export const aieaPageRouteName = 'Aiea_Thread';
userRoutes.route('/aiea', {
  name: aieaPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: aieaPageRouteName });
  },
});

export const upassPageRouteName = 'Upass_Thread';
userRoutes.route('/upass', {
  name: upassPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: upassPageRouteName });
  },
});

export const shuttlePageRouteName = 'Shuttle_Thread';
userRoutes.route('/shuttle', {
  name: shuttlePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: shuttlePageRouteName });
  },
});
/*                        ROUTES FOR DEGREE THREAD TOPICS                     */
export const tuitionPageRouteName = 'Tuition_Thread';
userRoutes.route('/tuition', {
  name: tuitionPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: tuitionPageRouteName });
  },
});

export const summerPageRouteName = 'Summer_Thread';
userRoutes.route('/summer', {
  name: summerPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: summerPageRouteName });
  },
});

export const minorPageRouteName = 'Minor_Thread';
userRoutes.route('/minor', {
  name: minorPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: minorPageRouteName });
  },
});

/*                        ROUTES FOR FOOD THREAD TOPICS                     */
export const foodtruckPageRouteName = 'FoodTruck_Thread';
userRoutes.route('/food/foodtrucks', {
  name: foodtruckPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: foodtruckPageRouteName });
  },
});

export const afterhoursfoodPageRouteName = 'AfterHoursFood_Thread';
userRoutes.route('/food/afterhoursfood', {
  name: afterhoursfoodPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: afterhoursfoodPageRouteName });
  },
});

export const winterhourfoodPageRouteName = 'WinterHours_Thread';
userRoutes.route('/food/winterhoursfood', {
  name: winterhourfoodPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: winterhourfoodPageRouteName });
  },
});

export const mealplanPageRouteName = 'MealPlan_Thread';
userRoutes.route('/food/mealplan', {
  name: mealplanPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: mealplanPageRouteName });
  },
});

export const cchoursPageRouteName = 'CCHours_Thread';
userRoutes.route('/food/cchours', {
  name: cchoursPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: cchoursPageRouteName });
  },
});

export const vendmachPageRouteName = 'VendingMachine_Thread';
userRoutes.route('/food/vendingmachine', {
  name: vendmachPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: vendmachPageRouteName });
  },
});

export const needcoffeePageRouteName = 'NeedCoffee_Thread';
userRoutes.route('/food/needcoffee', {
  name: needcoffeePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: needcoffeePageRouteName });
  },
});

export const vegetarianPageRouteName = 'Vegetarian_Thread';
userRoutes.route('/food/vegetarian', {
  name: vegetarianPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: vegetarianPageRouteName });
  },
});

export const offcampusfoodPageRouteName = 'OffCampusFood_Thread';
userRoutes.route('/food/offcampusfood', {
  name: offcampusfoodPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: offcampusfoodPageRouteName });
  },
});

export const dessertPageRouteName = 'Dessert_Thread';
userRoutes.route('/food/dessert', {
  name: dessertPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: dessertPageRouteName });
  },
});

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
