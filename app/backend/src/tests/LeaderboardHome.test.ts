import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app }  from '../app';
import { Response } from 'superagent';
import mockLeaderboardHome from '../utils/mocks/mockLeaderboardHome';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota leaderboard/home', () => {
    
 let chaiHttpRes: Response;

  it('Verifica se a rota GET/leaderboard/home retorna o placar dos times da casa', async() => {
 
    chaiHttpRes = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpRes.status).to.be.equal(200);
    expect(chaiHttpRes.body).to.be.deep.equal(mockLeaderboardHome);
    
  });
  
});
