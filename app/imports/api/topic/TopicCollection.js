import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

class TopicCollection extends BaseCollection {
  constructor() {
    super('Topic', new SimpleSchema({
      title: { type: String, optional: true },
      thread: { type: Array, optional: true },
      'thread.$': { type: String },
      information: { type: String, optional: true },
    }, { tracker: Tracker }));
  }
  define({ title = '', thread = [], information = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      title: String,
      information: String,
    };
    check({ title, information }, checkPattern);
    return this._collection.insert({ title, thread, information });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const thread = doc.thread;
    const information = doc.information;

    return { title, thread, information };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Topics = new TopicCollection();

