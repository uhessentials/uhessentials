import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Thread */

/**
 * Represents a specific thread, such as "Campus Events".
 * @extends module:Base~BaseCollection
 */
class ThreadCollection extends BaseCollection {

  /**
   * Creates the Thread collection.
   */
  constructor() {
    super('Thread', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Thread.
   * @example
   * Interests.define({ name: 'Campus Events',
   *                    description: 'A thread about events going on around campus. This includes library and
   *                    bookstore hours, campus events, gym hours, etc.' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the interest definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Thread`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Thread name corresponding to the passed thread docID.
   * @param threadID An thread docID.
   * @returns { String } A thread name.
   * @throws { Meteor.Error} If the thread docID cannot be found.
   */
  findName(threadID) {
    this.assertDefined(threadID);
    return this.findDoc(threadID).name;
  }

  /**
   * Returns a list of Thread names corresponding to the passed list of Thread docIDs.
   * @param interestIDs A list of Thread docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(threadIDs) {
    return threadIDs.map(threadID => this.findName(threadID));
  }

  /**
   * Throws an error if the passed name is not a defined Thread name.
   * @param name The name of an interest.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Thread names.
   * @param names An array of (hopefully) Thread names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Thread name, or throws an error if it cannot be found.
   * @param { String } name An thread name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Thread.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Thread names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of thread names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Thread name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Thread docID in a format acceptable to define().
   * @param docID The docID of an Thread.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Threads = new ThreadCollection();
