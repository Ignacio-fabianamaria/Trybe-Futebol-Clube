import MatchesModel from '../database/models/MatchesModel';

export default interface IServiceMatches {
  findAll():Promise<MatchesModel[]>;
}
