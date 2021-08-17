import { Router } from "express";
import { initUser } from './user';

const ApiPath = {
    USER: '/users'
};

const initApi = (router: Router) => {
    router
    .use(ApiPath.USER,
        initUser()
    );
    return router;
};

export { initApi };
