import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';
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
      campuses: { type: String, optional: true },
      'campuses.$': { type: String },
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
   *                   picture: '',
   *                   bio: 'I am a student at UH Manoa.',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, standing = '', campuses = [], gender = '', picture = '', bio = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String,
      lastName: String,
      username: String,
      standing: String,
      picture: String,
      bio: String,
    };
    check({ firstName, lastName, username, standing, picture, bio }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Campuses.assertNames(campuses);

    return this._collection.insert({ firstName, lastName, username, standing, campuses, gender, picture, bio });
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
    const campuses = doc.campuses;
    const picture = doc.picture;
    const bio = doc.bio;

    return { firstName, lastName, username, standing, campuses, picture, bio };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();

