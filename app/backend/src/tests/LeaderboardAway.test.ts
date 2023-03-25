import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app }  from '../app';
import { Response } from 'superagent';
import mockLeaderboardaway from '../utils/mocks/mockLeaderboardAway';
import mockLeaderboardAway from '../utils/mocks/mockLeaderboardAway';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota leaderboard/away', () => {
    
 let chaiHttpRes: Response;

  it('Verifica se a rota GET/leaderboard/away retorna o placar dos times visitantes', async() => {
 
    chaiHttpRes = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpRes.status).to.be.equal(200);
    expect(chaiHttpRes.body).to.be.deep.equal(mockLeaderboardAway);
    
  });
  
});
