import { Threads } from '/imports/api/thread/ThreadCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Topics } from '/imports/api/topic/TopicCollection';

Threads.publish();
Campuses.publish();
Profiles.publish();
Topics.publish();

