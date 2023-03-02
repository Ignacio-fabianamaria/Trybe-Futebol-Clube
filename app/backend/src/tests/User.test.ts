import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/TeamModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import UserModel from '../database/models/UserModel'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota /users', () => {

  let chaiHttpRes: Response;

  it(`Verifica que não é possível efetuar login sem um email um password.`, async () => {
    const noEmail = {
      "email": "",
      "password": "password1"
    }
    const noPassword = {
      "email": "trybe@trybe.com",
      "password": ""
    }
    const resNoEmail = await chai.request(app).post('/login').send(noEmail);
    expect(resNoEmail.status).to.be.deep.equal(400);
    const resNoPassword = await chai.request(app).post('/login').send(noPassword);
    expect(resNoPassword.status).to.be.deep.equal(400);

  });

});
