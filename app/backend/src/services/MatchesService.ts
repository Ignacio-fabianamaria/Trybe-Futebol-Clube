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
}
