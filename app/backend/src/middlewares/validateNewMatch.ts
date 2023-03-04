import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const THERE_IS_NO_TEAM = 'There is no team with such id!';
const NOT_POSSIBLE_CREATE = 'It is not possible to create a match with two equal teams';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const matchesService = new MatchesService();

  const match = req.body;

  const homeTeamId = await matchesService.findById(match.homeTeamId);
  const awayTeamId = await matchesService.findById(match.awayTeamId);

  if (!homeTeamId || !awayTeamId) {
    return res.status(404).json({ message: THERE_IS_NO_TEAM });
  }
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({ message: NOT_POSSIBLE_CREATE });
  }
  next();
}
