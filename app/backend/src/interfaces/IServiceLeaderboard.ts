import MatchesModel from '../database/models/MatchesModel';

export default interface IServiceLeaderboard {
  findAllTeams():Promise<MatchesModel[]>
}
