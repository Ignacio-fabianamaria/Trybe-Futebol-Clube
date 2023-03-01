import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app }  from '../app';
import Example from '../database/models/TeamModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import UserModel from '../database/models/UserModel'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota /users', () => {
    
 let chaiHttpRes: Response;

  it('Verifica se ', async() => {
 
  });
  
});
