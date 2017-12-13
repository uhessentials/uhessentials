import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

class CampusCollection extends BaseCollection {
  constructor() {
    super('Campus', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Campus`);
    }
    return this._collection.insert({ name, description });
  }
  findName(campusID) {
    this.assertDefined(campusID);
    return this.findDoc(campusID).name;
  }
  findNames(campusIDs) {
    return campusIDs.map(campusID => this.findName(campusID));
  }
  assertName(name) {
    this.findDoc(name);
  }
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }
  findID(name) {
    return (this.findDoc(name)._id);
  }
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}
export const Campuses = new CampusCollection();
