import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceMatches from '../interfaces/IServiceMatches';
import IUpdateMatches from '../interfaces/IUpdateMatches';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findAll(): Promise<MatchesModel[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async filterMacthes(query:boolean): Promise<MatchesModel[]> {
    const matchesFilter = await this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matchesFilter;
  }

  async updateMatches(id: string, body:IUpdateMatches): Promise<[number]> {
    const updated = await this.model.update(
      body,
      { where: { id } },
    );
    return updated;
  }

  async finishMatches(id: string): Promise<[number]> {
    const finishedMatch = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );// o retorno é [affectedCount: number]
    return finishedMatch;
  }
}
