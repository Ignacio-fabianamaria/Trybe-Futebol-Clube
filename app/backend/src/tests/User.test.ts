import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/TeamModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota /users', () => {

  let chaiHttpRes: Response;

  it(`Verifica que não é possível efetuar login sem um email ou password na rota GET/login.`, async () => {
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
  it(`Verifica que não é possível efetuar login com um usuário inválido na rota POST/login.`, async () => {
    const usuer = {
      "email": "trybe@trybe.com",
      "password": "password1"
    }
    const user = await chai.request(app).post('/login').send(usuer);
    expect(user.status).to.be.deep.equal(401);

  });

  it(`Verifica que é possível efetuar login com um usuário válido na rota POST/login.`, async () => {
    const usuer = {
      "email": "user@user.com",
      "password": "secret_user"
    }
    const user = await chai.request(app).post('/login').send(usuer);
    expect(user.status).to.be.deep.equal(200);

  });

  it(`Verifica que um token não é retornado ao efetuar login com dados inválidos na rota GET/login/role.`, async () => {
    const usuer = {
      "email": "trybe@trybe.com",
      "password": "password1"
    }
    const user = await chai.request(app).get('/login/role').send(usuer);
    expect(user.status).to.be.deep.equal(401);

  });

});
