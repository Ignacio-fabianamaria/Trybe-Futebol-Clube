import MatchesModel from '../database/models/MatchesModel';
import IMatches from './IMatches';
import IUpdateMatches from './IUpdateMatches';

export default interface IServiceMatches {
  createNewMatch(body:IMatches):Promise<MatchesModel>
  findById(id:string):Promise<MatchesModel | null>
  findAll():Promise<MatchesModel[]>;
  filterMacthes(query:boolean):Promise<MatchesModel[]>;
  finishMatches(id:string):Promise<[number]>;
  updateMatches(id:string, body:IUpdateMatches):Promise<[number]>;
}
