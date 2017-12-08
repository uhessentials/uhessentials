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
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      standing: { type: String, optional: true },
      campuses: { type: Array, optional: true },
      'campuses.$': { type: String },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      bio: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   campuses: ['University of Hawaiʻi, Mānoa'],
   *                   standing: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ username, firstName = '', lastName = '', standing = '', campuses = [], picture = '', bio = '' }) {
    // make sure required fields are OK.
    const checkPattern = { username: String, firstName: String, lastName: String, standing: String,
      picture: String, bio: String };
    check({ username, firstName, lastName, standing, picture, bio }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Campuses.assertNames(campuses);

    // Throw an error if there are duplicates in the passed interest names.
    if (campuses.length !== _.uniq(campuses).length) {
      throw new Meteor.Error(`${campuses} contains duplicates`);
    }

    return this._collection.insert({ username, firstName, lastName, standing, campuses, picture, bio });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const standing = doc.standing;
    const campuses = doc.campuses;
    const picture = doc.picture;
    const bio = doc.bio;
    return { username, firstName, lastName, standing, campuses, picture, bio };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
