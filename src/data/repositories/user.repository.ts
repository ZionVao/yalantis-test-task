import { Abstract } from './abstract.repository';
import { ModelCtor } from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user.model';

class User extends Abstract {
    constructor(userModel: ModelCtor<UserInstance>) {
        super(userModel);
    }

    addUser(user: UserAttributes) {
        return this.create(user);
    }

    getUserById(id: number) {
        return this.model.findOne({ where: { id } });
    }
}

export { User };
