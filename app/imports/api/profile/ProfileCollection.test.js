/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
<<<<<<< HEAD
    const firstName = 'April';
    const lastName = 'Bala';
    const username = 'aaibala';
    const standing = 'Student';
    const gender = 'female';
    const picture = '';
    const campus = 'University of Hawaii at Manoa';
    const bio = 'I am a student at UH Manoa.';

    const defineObject = { firstName, lastName, username, standing, gender, picture, campus, bio };
=======
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const gender = 'male';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const title = 'Professor Computer Science';
    const defineObject = { firstName, lastName, username, bio, picture, title, gender };
>>>>>>> master

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
      expect(doc.gender).to.equal(gender);
<<<<<<< HEAD
=======
      expect(doc.bio).to.equal(bio);
>>>>>>> master
      expect(doc.picture).to.equal(picture);
      expect(doc.campus).to.equal(campus);
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
<<<<<<< HEAD
=======

    it( function test() {
      const defineObject2 = { firstName, lastName, username, bio, picture, title };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it( function test() {
      const defineObject3 = { firstName, lastName, username, bio, picture, title };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
>>>>>>> master
  });
}

