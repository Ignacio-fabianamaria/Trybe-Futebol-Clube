import TeamModel from '../database/models/TeamModel';

export default interface IServiceTeam {
  findAll(): Promise<TeamModel[]>;
  findById(id:number): Promise<TeamModel>;
}
