import { sequelize as orm } from '../db/connection';
import { init as initUserModel } from './user.model';

const User = initUserModel(orm);

export { User as UserModel };