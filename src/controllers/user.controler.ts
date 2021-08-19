import { Get, Route, Post, SuccessResponse, FormField, UploadedFile } from 'tsoa';
import { Model } from 'sequelize';
import { User } from '../data/repositories/user.repository';
import { UserModel } from '../data/models/models';

import { UserAttributes } from '../data/models/user.model';

const UserRepository = new User(UserModel);

// type UserCreationParams = Pick<UserAttributes, 'email' | 'firstname' | 'lastname' | 'photourl'>;

@Route('users')
export default class UserController {
    @Get('/')
    public async getUsers(): Promise<UserAttributes[]> {
        return UserRepository.getAll() as unknown as Promise<UserAttributes[]>;
    }

    @Get('/:id')
    public async getUserById(id: string): Promise<UserAttributes> {
        return UserRepository.getUserById(Number(id)) as unknown as Promise<UserAttributes>;
    }

    @SuccessResponse('201', 'Created')
    @Post('/')
    public async createUser(
        @FormField() email: string,
        @FormField() firstname: string,
        @FormField() lastname: string,
        @UploadedFile('photofile') photo: Express.Multer.File,
    ): Promise<Model<any, any>> {
        const user: UserAttributes = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            photourl: photo.filename,
        };
        const createdUser = await UserRepository.addUser(user);
        return createdUser;
    }
}
