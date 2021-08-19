import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface UserAttributes {
    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    photourl: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const init = (orm: Sequelize) => {
    const User = orm.define<UserInstance>(
        'user',
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            firstname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            photourl: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {},
    );

    return User;
};

export { init, UserInstance, UserAttributes };
