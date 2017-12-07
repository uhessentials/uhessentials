import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Threads } from '/imports/api/thread/ThreadCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Threads.removeAll();
}
