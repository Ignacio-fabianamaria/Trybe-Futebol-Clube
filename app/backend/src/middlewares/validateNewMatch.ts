import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const THERE_IS_NO_TEAM = 'There is no team with such id!';
const NOT_POSSIBLE_CREATE = 'It is not possible to create a match with two equal teams';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  const matchesService = new MatchesService();

  const home = await matchesService.createNewMatch(homeTeamId);
  const away = await matchesService.createNewMatch(awayTeamId);

  if (!home || !away) {
    return res.status(404).json({ message: THERE_IS_NO_TEAM });
  }
  if (home === away) {
    return res.status(422).json({ message: NOT_POSSIBLE_CREATE });
  }
  next();
}
