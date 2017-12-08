import { Threads } from '/imports/api/thread/ThreadCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Topics } from '/imports/api/topic/TopicCollection';

Threads.publish();
Profiles.publish();
Topics.publish();
