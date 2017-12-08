/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Topics } from '/imports/api/topic/TopicCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('TopicCollection', function testSuite() {
    const threadName = '';
    const threadDescription = '';
    const title = '';
    const threads = [threadName];
    const information = 'http://philipmjohnson.org/headshot.jpg';
    const defineObject = { title, threads, information };

    before(function setup() {
      removeAllEntities();
      // Define a sample interest.
      Threads.define({ name: threadName, description: threadDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Topics.define(defineObject);
      expect(Topics.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Topics.findDoc(docID);
      expect(doc.title).to.equal(title);
      expect(doc.threads[0]).to.equal(threadName);
      expect(doc.information).to.equal(information);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Topics.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Topics.dumpOne(docID);
      Topics.removeIt(docID);
      expect(Topics.isDefined(docID)).to.be.false;
      docID = Topics.restoreOne(dumpObject);
      expect(Topics.isDefined(docID)).to.be.true;
      Topics.removeIt(docID);
    });

    it('#define (illegal thread)', function test() {
      const illegalThreads = ['foo'];
      const defineObject2 = { title, threads: illegalThreads, information };
      expect(function foo() { Topics.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate threads)', function test() {
      const duplicateThreads = [threadName, threadName];
      const defineObject3 = { title, threads: duplicateThreads, information };
      expect(function foo() { Topics.define(defineObject3); }).to.throw(Error);
    });
  });
}

