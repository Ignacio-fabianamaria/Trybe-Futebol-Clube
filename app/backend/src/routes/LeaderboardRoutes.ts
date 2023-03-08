import { Router, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/leaderboard/home',
  (req:Request, res:Response) => leaderboardController.getLeaderbords(req, res),
);
leaderboardRoutes.get(
  '/leaderboard/away',
  (req:Request, res:Response) => leaderboardController.getLeaderbordsAway(req, res),
);
export default leaderboardRoutes;
