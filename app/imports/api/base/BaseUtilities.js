import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Topics } from '/imports/api/topic/TopicCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Topics.removeAll();
  Threads.removeAll();
  Campuses.removeAll();
}
