import { Campuses } from '/imports/api/campus/CampusCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('CampusCollection', function testSuite() {
    const name = 'Campus';
    const defineObject = { name };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Campuses.define(defineObject);
      expect(Campuses.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Campuses.findDoc(docID);
      expect(doc.name).to.equal(name);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Campuses.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Thread.
      const dumpObject = Campuses.dumpOne(docID);
      Campuses.removeIt(docID);
      expect(Campuses.isDefined(docID)).to.be.false;
      docID = Campuses.restoreOne(dumpObject);
      expect(Campuses.isDefined(docID)).to.be.true;
      Campuses.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Campuses.define(defineObject);
      expect(Campuses.isDefined(docID)).to.be.true;
      const docID2 = Campuses.findID(name);
      expect(docID).to.equal(docID2);
      Campuses.findIDs([name, name]);
      Campuses.removeIt(docID);
    });
  });
}

