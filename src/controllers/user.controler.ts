import { 
    Get, 
    Route, 
    Post, 
    Body, 
    SuccessResponse,
    FormField,
    UploadedFiles,
    UploadedFile,
    Request
} from "tsoa";
import * as express from "express";
import multer from "multer";
import { Model } from "sequelize";
import { User } from '../data/repositories/user.repository';
import { UserModel } from '../data/models/models';

import { UserAttributes } from '../data/models/user.model';

const UserRepository = new User(UserModel);

type UserCreationParams = Pick<UserAttributes, "email" | "firstname" | "lastname" | "photourl">;

@Route("users")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Model<any, any>[]> {
        return UserRepository.getAll();
    };

    @Get("/:id")
    public async getUserById(id: string): Promise<Model<any, any>> {
        return UserRepository.getUserById(Number(id)) as Promise<Model<any, any>>;
    };

    @SuccessResponse("201", "Created")
    @Post("/")
    public async createUser(
        // @FormField() title: string,
        // @FormField() description: string,
        // @UploadedFiles() files: Express.Multer.File[],
        // @UploadedFile("filename") file: express.Request,
        @UploadedFile("filename") file: Express.Multer.File,
        // @Request() request: express.Request
        // @Body() requestBody: UserCreationParams,
    ): Promise<any> {
        // UserRepository.addUser(requestBody);
        // UserRepository.add(title, file);
        return file;
    }
}
