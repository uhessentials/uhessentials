import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Post */


class PostCollection extends BaseCollection {

  /**
   * Creates the Post collection.
   */
  constructor() {
    super('Post', new SimpleSchema({
      username: { type: String },
      subject: { type: String, optional: true },
      threads: { type: String, optional: true },
      'threads.$': { type: String },
      info: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Post.
   * @example
   * Profiles.define({ username: 'aaibala',
   *                   subject: 'Sinclair Library',
   *                   threads: 'Campus Events',
   *                   info: 'What time does Sinclair close?',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists.
   * @returns The newly created docID.
   */
  define({ username, subject = '', threads = [], info = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      username: String,
      subject: String,
      info: String,
    };
    check({ username, subject, info }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Threads.assertNames(threads);

    // Throw an error if there are duplicates in the passed interest names.
    if (threads.length !== _.uniq(threads).length) {
      throw new Meteor.Error(`${threads} contains duplicates`);
    }


    return this._collection.insert({ username, subject, threads, info });
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
    const threads = doc.threads;
    const info = doc.info;

    return { username, subject, threads, info };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Posts = new PostCollection();

