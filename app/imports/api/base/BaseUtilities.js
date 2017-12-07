import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';
import { Campuses } from '/imports/api/campus/CampusCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Threads.removeAll();
  Campuses.removeAll();
}
