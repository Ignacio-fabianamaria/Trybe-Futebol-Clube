import MatchesModel from '../database/models/MatchesModel';

export default interface IServiceLeaderboard {
  findAllHome():Promise<MatchesModel[]>
}
