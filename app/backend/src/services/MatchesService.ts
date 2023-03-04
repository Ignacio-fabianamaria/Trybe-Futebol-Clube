import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceMatches from '../interfaces/IServiceMatches';

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

  async finishMatches(id: string): Promise<[number]> {
    const findById = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );// o retorno é [affectedCount: number]
    return findById;
  }
}
