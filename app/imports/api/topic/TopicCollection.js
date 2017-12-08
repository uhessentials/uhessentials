import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

class TopicCollection extends BaseCollection {
  constructor() {
    super('Topic', new SimpleSchema({
      title: { type: String },
      thread: { type: Array },
      'thread.$': { type: String },
      information: { type: String, optional: true },
    }, { tracker: Tracker }));
  }
  define({ title = '', threads = [], information = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      title: String,
      information: String,
    };
    check({ title, information }, checkPattern);
    Threads.assertNames(threads);
    return this._collection.insert({ title, threads, information });
  }


  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const threads = doc.threads;
    const information = doc.information;

    return { title, threads, information };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Topics = new TopicCollection();

