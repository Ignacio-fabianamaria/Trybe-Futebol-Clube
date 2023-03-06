import MatchesModel from '../database/models/MatchesModel';
import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  getMatchAndTeamName():Promise<MatchesModel[]>
  createLeaderboard():Promise<ILeaderboard[]>
}
