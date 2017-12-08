/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Topics } from '/imports/api/topic/TopicCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const threadName = 'Degree Programs';
    const threadDescription = 'This thread contains questions regarding university degrees, majors, minors, classes, registration, etc.';
    const username = 'aaibala';
    const title = 'Summer 2018 Registration';
    const threads = [threadName];
    const info = 'When can we start registering for classes for summer 2018?';
    const defineObject = { username, title, threads, info };

    before(function setup() {
      removeAllEntities();
      // Define a sample thread.
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
      expect(doc.username).to.equal(username);
      expect(doc.title).to.equal(title);
      expect(doc.threads[0]).to.equal(threadName);
      expect(doc.info).to.equal(info);
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
      const defineObject2 = { username, title, threads: illegalThreads, info };
      expect(function foo() { Topics.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate threads)', function test() {
      const duplicateThreads = [threadName, threadName];
      const defineObject3 = { username, title, threads: duplicateThreads, info };
      expect(function foo() { Topics.define(defineObject3); }).to.throw(Error);
    });
  });
}

