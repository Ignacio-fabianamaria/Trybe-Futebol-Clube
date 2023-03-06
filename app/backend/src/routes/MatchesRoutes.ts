import { Request, Response, Router } from 'express';
import validateNewMatch from '../middlewares/validateNewMatch';
import validateToken from '../middlewares/validateToken';
import MatchesControler from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRoutes = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesControler(matchesService);

matchesRoutes.get(
  '/matches',
  (req:Request, res:Response) => matchesController.findAll(req, res),
);

matchesRoutes.post(
  '/matches',
  validateToken,
  validateNewMatch,
  (req:Request, res:Response) => matchesController.createNewMatch(req, res),
);

matchesRoutes.patch(
  '/matches/:id',
  validateToken,
  (req:Request, res:Response) => matchesController.updateMatches(req, res),
);

matchesRoutes.patch(
  '/matches/:id/finish',
  validateToken,
  (req:Request, res:Response) => matchesController.finishMatches(req, res),
);

export default matchesRoutes;
