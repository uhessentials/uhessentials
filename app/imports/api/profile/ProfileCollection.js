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
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      standing: { type: String, optional: true },
      'standing.$': { type: String },
      campus: { type: String, optional: true },
      'campus.$': { type: String },
      gender: { type: String, optional: true },
      'gender.$': { type: String },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      bio: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'April',
   *                   lastName: 'Bala',
   *                   username: 'aaibala',
   *                   standing: 'Student',
   *                   campus: 'University of Hawaii at Manoa',
   *                   gender: 'Female',
   *                   picture: '',
   *                   bio: 'I am a student at UH Manoa.',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, standing = '', campus = '', gender = '', picture = '', bio = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String,
      lastName: String,
      username: String,
      standing: String,
      campus: String,
      gender: String,
      picture: String,
      bio: String,
    };
    check({ firstName, lastName, username, standing, campus, gender, picture, bio }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }
    return this._collection.insert({ firstName, lastName, username, standing, campus, gender, picture, bio });
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
    const standing = doc.standing;
    const campus = doc.campus;
    const gender = doc.gender;
    const picture = doc.picture;
    const bio = doc.bio;

    return { firstName, lastName, username, standing, campus, gender, picture, bio };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();

