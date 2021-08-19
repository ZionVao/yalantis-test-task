import { Router, Request, Response, NextFunction, request } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import * as fs from 'fs';
import UserController from '../controllers/user.controler';

const UserApiPath = {
    ROOT: '/',
    $ID: '/:id',
};

const UploadFolderPath = 'uploads/';

const controller = new UserController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(UploadFolderPath)) fs.mkdirSync(UploadFolderPath, { recursive: true });
        cb(null, UploadFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadImage = multer({ storage });

const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            console.log(req.file, 'file');
            const buffer = await sharp(req.file.path)
                .resize(200, 200)
                .toFormat('jpeg')
                .jpeg({ quality: 100 })
                .toBuffer();
            await sharp(buffer).toFile(req.file.path, (err, info) => {
                console.log('error-info', err, info);
            });
            fs.unlinkSync(req.file.path);
            console.log(req.file.path);
            next();
        } catch (error) {
            console.log(error, 'err');
            next();
        }
    }
};

const initUser = () => {
    const router = Router();
    router
        .get(UserApiPath.ROOT, async (req: Request, res: Response, next: NextFunction) => {
            const response = await controller.getUsers();
            if (response) return res.send(response);
            return res.sendStatus(404);
        })
        .get(UserApiPath.$ID, async (req: Request, res: Response, next: NextFunction) => {
            const response = await controller.getUserById(req.params.id);
            if (response) return res.send(response);
            return res.sendStatus(404);
        })
        .post(
            UserApiPath.ROOT,
            uploadImage.single('photofile'),
            resizeImage,
            async (req: Request, res: Response, next: NextFunction) => {
                if (req.file) {
                    const response = await controller.createUser(
                        req.body.email,
                        req.body.firstname,
                        req.body.lastname,
                        req.file,
                    );
                    return res.json({ id: response.getDataValue('id') });
                } else {
                    res.sendStatus(400);
                }
            },
        );
    return router;
};

export { initUser };
