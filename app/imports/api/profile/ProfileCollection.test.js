/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const campusName = 'Software Engineering';
    const campusDescription = 'Tools for software development';
    const username = 'johnson';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const standing = 'ICS Professor';
    const campuses = [campusName];
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const defineObject = { username, firstName, lastName, standing, campuses, picture, bio };

    before(function setup() {
      removeAllEntities();
      // Define a sample campus.
      Campuses.define({ name: campusName, description: campusDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Profiles.define(defineObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Profiles.findDoc(docID);
      expect(doc.username).to.equal(username);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.standing).to.equal(standing);
      expect(doc.campuses[0]).to.equal(campusName);
      expect(doc.picture).to.equal(picture);
      expect(doc.bio).to.equal(bio);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Profiles.dumpOne(docID);
      Profiles.removeIt(docID);
      expect(Profiles.isDefined(docID)).to.be.false;
      docID = Profiles.restoreOne(dumpObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      Profiles.removeIt(docID);
    });

    it('#define (illegal campus)', function test() {
      const illegalCampuses = ['foo'];
      const defineObject2 = { username, firstName, lastName, standing, campuses: illegalCampuses, picture, bio };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate campuses)', function test() {
      const duplicateCampuses = [campusName, campusName];
      const defineObject3 = { username, firstName, lastName, standing, campuses: duplicateCampuses, picture, bio };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
  });
}

