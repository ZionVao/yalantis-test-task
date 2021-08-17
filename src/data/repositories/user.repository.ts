import { Abstract } from './abstract.repository';
import { ModelCtor } from "sequelize";
import { UserAttributes, UserInstance } from '../models/user.model';
import * as express from "express";
import * as multer from "multer";

class User extends Abstract {
    constructor(userModel: ModelCtor<UserInstance>) {
        super(userModel);
    }

    // addUser(user: UserAttributes, request: express.Request) {
    addUser(user: UserAttributes) {
        const requestField = "imageFile";
        const filterExt = "zip";
        const storePath = "tmp";
        const fileName = "img.zip";


        return this.create(user);
    }

    add(title: string, file: any){
        console.log(title, file);
    }

    getUserById(id: number) {
        return this.model.findOne({ where: { id } });
    }
}

export { User };
