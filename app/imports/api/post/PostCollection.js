import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Post */


class PostCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      subject: { type: String, optional: true },
      thread: { type: String, optional: true },
      info: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ username: 'aaibala',
   *                   subject: 'Sinclair Library',
   *                   thread: 'Campus Events',
   *                   info: 'Is Sinclair open late tonight? I need a place to study.',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists.
   * @returns The newly created docID.
   */
  define({ username, subject = '', thread = '', info = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      username: String,
      subject: String,
      thread: String,
      info: String,
    };
    check({ username, subject, thread, info }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }
    return this._collection.insert({ username, subject, thread, info });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const subject = doc.subject;
    const thread = doc.thread;
    const info = doc.info;

    return { username, subject, thread, info };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Posts = new PostCollection();

