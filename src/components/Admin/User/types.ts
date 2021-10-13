import { User as UserDocument } from '@db/entities/User/types';

export interface UserOverviewType
  extends Pick<
    UserDocument,
    "email" | "quizStartTime" | "quizEndTime" | "isConfirmed"
  > {
  quizTime?: string | null;
  score?: number;
}

export type UsersOverviewType = ReadonlyArray<UserOverviewType>;

export interface UserDetails extends UserDocument { }
