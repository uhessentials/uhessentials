/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const firstName = 'April';
    const lastName = 'Bala';
    const username = 'aaibala';
    const standing = 'Student';
    const campus = 'University of Hawaii at Manoa';
    const picture = '';
    const bio = 'I am a student at UH Manoa.';

    const defineObject = { firstName, lastName, username, standing, campus, picture, bio };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Profiles.define(defineObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Profiles.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.standing).to.equal(standing);
      expect(doc.campus).to.equal(campus);
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

    it(function test() {
      const defineObject2 = { firstName, lastName, username, standing, campus, picture, bio };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it(function test() {
      const defineObject3 = { firstName, lastName, username, standing, campus, picture, bio };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
  });
}

