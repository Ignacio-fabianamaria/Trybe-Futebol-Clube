import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app }  from '../app';
import Example from '../database/models/TeamModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota /teams', () => {
  
   // Exemplo do uso de stubs com tipos
   
 let chaiHttpRes: Response;
 const teamsList = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]
   beforeEach (async () => { sinon.stub(TeamModel, "findAll").resolves([
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
] as TeamModel[])});

   afterEach(()=>{ (TeamModel.findAll as sinon.SinonStub).restore()})


  it('Verifica se a rota GET/teams retorna uma lista com todos os times', async() => {
 
    chaiHttpRes = await chai.request(app).get('/teams');
    expect(chaiHttpRes.status).to.be.equal(200);
    expect(chaiHttpRes.body).to.be.deep.equal(teamsList);
    
  });
});
