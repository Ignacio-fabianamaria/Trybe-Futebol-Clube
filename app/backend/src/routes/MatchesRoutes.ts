import { Request, Response, Router } from 'express';
import MatchesControler from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRoutes = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesControler(matchesService);

matchesRoutes.get('/matches', (req:Request, res:Response) => matchesController.findAll(req, res));

export default matchesRoutes;
