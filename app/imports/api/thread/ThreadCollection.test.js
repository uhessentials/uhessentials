import { Threads } from '/imports/api/thread/ThreadCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ThreadCollection', function testSuite() {
    const name = 'Thread Type';
    const description = 'Distinct threads to sort posts from users';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Threads.define(defineObject);
      expect(Threads.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Threads.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Threads.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Thread.
      const dumpObject = Threads.dumpOne(docID);
      Threads.removeIt(docID);
      expect(Threads.isDefined(docID)).to.be.false;
      docID = Threads.restoreOne(dumpObject);
      expect(Threads.isDefined(docID)).to.be.true;
      Threads.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Threads.define(defineObject);
      expect(Threads.isDefined(docID)).to.be.true;
      const docID2 = Threads.findID(name);
      expect(docID).to.equal(docID2);
      Threads.findIDs([name, name]);
      Threads.removeIt(docID);
    });
  });
}

