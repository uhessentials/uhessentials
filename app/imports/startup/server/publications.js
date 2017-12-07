import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Posts } from '/imports/api/post/PostCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';

Profiles.publish();
Posts.publish();
Threads.publish();
