import './userMethods';
import './userPublications';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}
export type UserType = {
  username: string;
  _id: string;
  role: RolesEnum;
};
