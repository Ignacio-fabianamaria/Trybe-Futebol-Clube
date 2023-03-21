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

    const leaderbordAway = TEAMS.map((e) => ({
      name: e.teamName,
      totalPoints: Leaderboard.getAwayPoints(MATCHES, e.id),
      totalGames: Leaderboard.getAwayTotalGames(MATCHES, e.id),
      totalVictories: Leaderboard.getAwayVictories(MATCHES, e.id),
      totalDraws: Leaderboard.getAwayTotalDraws(MATCHES, e.id),
      totalLosses: Leaderboard.getAwayTotalLosses(MATCHES, e.id),
      goalsFavor: Leaderboard.getAwayGoalsFavor(MATCHES, e.id),
      goalsOwn: Leaderboard.getAwayGoalsOwn(MATCHES, e.id),
      goalsBalance: 0,
      efficiency: 0,
    }));

    return leaderbordAway;
  }

  static getAwayPoints(findPoints:MatchesModel[], id:number) {
    let awayPoints = 0;
    findPoints.filter((e) => {
      if (e.homeTeamId === id) {
        if (e.homeTeamGoals < e.awayTeamGoals) { awayPoints += 3; }
        if (e.homeTeamGoals === e.awayTeamGoals) { awayPoints += 1; }
      }
      return awayPoints;
    });
    return awayPoints;
  }

  static getAwayVictories(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
  }

  static getAwayTotalDraws(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
  }

  static getAwayTotalLosses(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
  }

  static getAwayTotalGames(findVictory:MatchesModel[], id:number) {
    const vic = findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
    const draws = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
    const losses = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
    return vic + draws + losses;
  }

  static getAwayGoalsFavor(findGoals:MatchesModel[], id:number) {
    let goalsFavor = 0;
    findGoals.filter((e) => {
      if (e.awayTeamId === id) {
        goalsFavor += e.awayTeamGoals;
      }
      return goalsFavor;
    });
    return goalsFavor;
  }

  static getAwayGoalsOwn(findGoals:MatchesModel[], id:number) {
    let goalsOwn = 0;
    findGoals.filter((e) => {
      if (e.awayTeamId === id) {
        goalsOwn += e.homeTeamGoals;
      }
      return goalsOwn;
    });
    return goalsOwn;
  }
  
}
