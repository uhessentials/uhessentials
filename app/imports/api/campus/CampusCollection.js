import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Campus */

/**
 * Represents a specific Campus, such as "Campus Services".
 * @extends module:Base~BaseCollection
 */
class CampusCollection extends BaseCollection {

  /**
   * Creates the Campus collection.
   */
  constructor() {
    super('Campus', new SimpleSchema({
      name: { type: String },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Thread.
   * @example
   * Threads.define({ name: 'Campus Services',
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the Thread definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Thread`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Campus name corresponding to the passed Campus docID.
   * @param CampusID An Campus docID.
   * @returns { String } An Campus name.
   * @throws { Meteor.Error} If the Campus docID cannot be found.
   */
  findName(CampusID) {
    this.assertDefined(CampusID);
    return this.findDoc(CampusID).name;
  }

  /**
   * Returns a list of Campus names corresponding to the passed list of Campus docIDs.
   * @param CampusIDs A list of Campus docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(CampusIDs) {
    return CampusIDs.map(CampusID => this.findName(CampusID));
  }

  /**
   * Throws an error if the passed name is not a defined Campus name.
   * @param name The name of an Campus.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Campus names.
   * @param names An array of (hopefully) Campus names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Thread name, or throws an error if it cannot be found.
   * @param { String } name An Thread name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Thread.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Campus names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of Campus names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Campus name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Campus docID in a format acceptable to define().
   * @param docID The docID of an Campus.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return { name };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Campuses = new CampusCollection();
