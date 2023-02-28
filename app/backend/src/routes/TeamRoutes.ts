import { Request, Response, Router } from 'express';
import TeamService from '../services/TeamService';
import TeamControler from '../controllers/TeamController';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamControler(teamService);

teamRoutes.get('/teams', (req:Request, res:Response) => teamController.findAll(req, res));
teamRoutes.get('/teams/:id', (req:Request, res:Response) => teamController.findById(req, res));

export default teamRoutes;
