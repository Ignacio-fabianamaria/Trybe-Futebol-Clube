import MatchesModel from '../database/models/MatchesModel';

export default interface IServiceMatches {
  findAll():Promise<MatchesModel[]>;
  filterMacthes(query:boolean):Promise<MatchesModel[]>
}
