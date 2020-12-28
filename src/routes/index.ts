import { Router } from 'express';
import ChristmasController from '../controllers/ChristmasController';

const routes = Router();

routes.post('/letter', ChristmasController.create);
routes.get('/letter/:id', ChristmasController.read);
routes.put('/letter/:id', ChristmasController.update);
routes.delete('/letter/:id', ChristmasController.delete);
routes.get('/letter', ChristmasController.index);

export default routes;
