import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async getLeaderboards(): Promise<ILeaderboard[]> {
    const MATCHES = await this.modelMatch.findAll({ where: { inProgress: false } });
    const TEAMS = await this.modelTeam.findAll();

    const leaderbordHome = TEAMS.map((e) => ({
      name: e.teamName,
      totalPoints: Leaderboard.getHomePoints(MATCHES, e.id),
      totalGames: Leaderboard.getHomeTotalGames(MATCHES, e.id),
      totalVictories: Leaderboard.getHomeVictories(MATCHES, e.id),
      totalDraws: Leaderboard.getHomeTotalDraws(MATCHES, e.id),
      totalLosses: Leaderboard.getHomeTotalLosses(MATCHES, e.id),
      goalsFavor: Leaderboard.getHomeGoalsFavor(MATCHES, e.id),
      goalsOwn: Leaderboard.getHomeGoalsOwn(MATCHES, e.id),
      goalsBalance: Leaderboard.getHomeGoalsBalance(MATCHES, e.id),
      efficiency: Number(Leaderboard.getHomeEfficiency(MATCHES, e.id)),
    }));
    const order = Leaderboard.getOrderHomeLeaderboard(leaderbordHome);
    return order;
  }

  static getHomePoints(findPoints:MatchesModel[], id:number) {
    let homePoints = 0;
    findPoints.filter((e) => {
      if (e.homeTeamId === id) {
        if (e.homeTeamGoals > e.awayTeamGoals) { homePoints += 3; }
        if (e.homeTeamGoals === e.awayTeamGoals) { homePoints += 1; }
      }
      return homePoints;
    });
    return homePoints;
  }

  static getHomeVictories(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
  }

  static getHomeTotalDraws(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
  }

  static getHomeTotalLosses(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
  }

  static getHomeTotalGames(findVictory:MatchesModel[], id:number) {
    const vic = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
    const draws = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
    const losses = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
    return vic + draws + losses;
  }

  static getHomeGoalsFavor(findGoals:MatchesModel[], id:number) {
    let goalsFavor = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        goalsFavor += e.homeTeamGoals;
      }
      return goalsFavor;
    });
    return goalsFavor;
  }

  static getHomeGoalsOwn(findGoals:MatchesModel[], id:number) {
    let goalsOwn = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        goalsOwn += e.awayTeamGoals;
      }
      return goalsOwn;
    });
    return goalsOwn;
  }

  static getHomeGoalsBalance(findGoals:MatchesModel[], id:number) {
    let GP = 0;
    let GC = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        GP += e.homeTeamGoals;
        GC += e.awayTeamGoals;
      }
      return GP - GC;
    });
    return GP - GC;
  }

  static getHomeEfficiency(match:MatchesModel[], id:number) {
    const totalPoints = Leaderboard.getHomePoints(match, id);
    const totalGames = (Leaderboard.getHomeTotalGames(match, id)) * 3;

    const efficiency = ((totalPoints / totalGames) * 100).toFixed(2);
    return efficiency;
  }

  static getOrderHomeLeaderboard(order:ILeaderboard[]) {
    // Ordenação do resultado:  decrescente usando o critério "totalPoints" .
    // Ordem para desempate: 1º totalVictories; 2º goalsBalance; 3º goalsFavor; 4º goalsOwn
    // Usando função de comparação do metodo .sort((a,b)=> b-a) para ordenar de forma decrescente.

    order.sort((a:ILeaderboard, b:ILeaderboard) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return b.goalsOwn - a.goalsOwn;
    });
    return order;
  }
}
