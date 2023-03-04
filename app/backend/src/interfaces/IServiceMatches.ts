import MatchesModel from '../database/models/MatchesModel';
import IUpdateMatches from './IUpdateMatches';

export default interface IServiceMatches {
  findAll():Promise<MatchesModel[]>;
  filterMacthes(query:boolean):Promise<MatchesModel[]>;
  finishMatches(id:string):Promise<[number]>;
  updateMatches(id:string, body:IUpdateMatches):Promise<[number]>;
}
