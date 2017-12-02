import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
<<<<<<< HEAD
      standing: { type: String, optional: true },
      'standing.$': { type: String },
      gender: { type: String, optional: true },
      'gender.$': { type: String },
=======
      bio: { type: String, optional: true },
      title: { type: String, optional: true },
>>>>>>> master
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      campus: { type: String, optional: true },
      'campus.$': { type: String },
      bio: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
<<<<<<< HEAD
   * Profiles.define({ firstName: 'April',
   *                   lastName: 'Bala',
   *                   username: 'aaibala',
   *                   standing: 'Student',
   *                   gender: 'Female',
   *                   picture: '',
   *                   campus: 'University of Hawaii at Manoa',
   *                   bio: 'I am a student at UH Manoa.',
=======
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
>>>>>>> master
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists.
   * @returns The newly created docID.
   */
<<<<<<< HEAD
  define({ firstName = '', lastName = '', username, standing = '', gender = '', picture = '', campus = '', bio = '' }) {
=======
  define({ firstName = '', lastName = '', username, bio = '', picture = '', title = '' }) {
>>>>>>> master
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String,
      lastName: String,
      username: String,
      standing: String,
      gender: String,
      picture: String,
      campus: String,
      bio: String,
    };
    check({ firstName, lastName, username, standing, gender, picture, campus, bio }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

<<<<<<< HEAD
    return this._collection.insert({ firstName, lastName, username, standing, gender, picture, campus, bio });
=======
    return this._collection.insert({ firstName, lastName, username, bio, picture, title });
>>>>>>> master
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
<<<<<<< HEAD
    const standing = doc.standing;
    const gender = doc.gender;
    const picture = doc.picture;
    const campus = doc.campus;
    const bio = doc.bio;

    return { firstName, lastName, username, standing, gender, picture, campus, bio };
=======
    const bio = doc.bio;
    const picture = doc.picture;
    const title = doc.title;
    return { firstName, lastName, username, bio, picture, title };
>>>>>>> master
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
