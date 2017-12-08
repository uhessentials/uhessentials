import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Topic */

/**
 * @extends module:Base~BaseCollection
 */
class TopicCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Topic', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      title: { type: String, optional: true },
      threads: { type: Array, optional: true },
      'threads.$': { type: String },
      info: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ username: 'aaibala',
   *                   title: 'Summer 2018 Registration',
   *                   threads: 'Degree Programs',
   *                   info: 'When can we start registering for classes for summer 2018?' });
   * @returns The newly created docID.
   */
  define({ username, title = '', threads = [], info = '' }) {
    // make sure required fields are OK.
    const checkPattern = { username: String, title: String, info: String };
    check({ username, title, info }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Threads.assertNames(threads);

    // Throw an error if there are duplicates in the passed interest names.
    if (threads.length !== _.uniq(threads).length) {
      throw new Meteor.Error(`${threads} contains duplicates`);
    }

    return this._collection.insert({ username, title, threads, info });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const title = doc.title;
    const threads = doc.threads;
    const info = doc.info;
    return { username, title, threads, info };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Topics = new TopicCollection();
