import { Profile } from '../../types';

export interface Props {
  profile?: Partial<Profile>;
  onSubmit: (profile: Partial<Profile>) => void;
}
