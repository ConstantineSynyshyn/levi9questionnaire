import { Profile } from '@lq-types/profile';

export interface Props {
  profile?: Partial<Profile>;
  onSubmit: (profile: Partial<Profile>) => void;
}
