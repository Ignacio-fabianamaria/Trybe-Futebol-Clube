import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  getLeaderboards():Promise<ILeaderboard[] | null>;
  getLeaderboardsAway():Promise<ILeaderboard[] | null>
}
