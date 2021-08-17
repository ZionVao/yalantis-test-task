import { Router, Request, Response, NextFunction, request } from 'express';
import multer from 'multer';
import UserController from '../controllers/user.controler';

const UserApiPath = {
    ROOT: '/',
    $ID: '/:id',
};

const controller = new UserController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname + '-' + Date.now() + '.png');
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const initUser = () => {
    const router = Router();
    router
        .get(UserApiPath.ROOT, async (req: Request, res: Response, next: NextFunction) => {
            const response = await controller.getUsers();
            return res.send(response);
        })
        .get(UserApiPath.$ID, async (req: Request, res: Response, next: NextFunction) => {
            const response = await controller.getUserById(req.params.id);
            return res.send(response);
        })
        .post(
            UserApiPath.ROOT,
            upload.single('filename'),
            async (req: Request, res: Response, next: NextFunction) => {
                if (req.file) {
                    const aaa = await controller.createUser(req.file);
                    res.sendStatus(201);
                    console.info(aaa.filename);
                } else {
                    res.sendStatus(400);
                }
            },
        );
    return router;
};

export { initUser };

// import express from "express";
// import UserController from '../controllers/user.controler';

// const router = express.Router();

// router.get("/users", async (_req, res) => {
//   const controller = new UserController();
//   const response = await controller.getUsers();
//   return res.send(response);
// });

// export default router;
