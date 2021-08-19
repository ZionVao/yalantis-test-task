import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { ENV } from './common/enums';
import { sequelize } from './data/db/connection';
import { initApi } from './routes/api';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

sequelize
    .authenticate()
    .then(() => {
        console.info('Connection has been established successfully.');
        console.info(sequelize.config);
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);

app.use(initApi(router));

app.listen(ENV.APP.PORT, () => {
    console.log('Server is running on port', ENV.APP.PORT);
});
