#  Projeto TFC - Trybe Futebol Clube!! :soccer: :soccer:


## :memo: Descrição
<p> O TFC é um site informativo sobre partidas e classificações de futebol!</p>
<p>A proposta para esse projeto foi construir um back-end dockerizado utilizando modelagem de dados através do Sequelize para integrar ao front end (ja construido pela Trybe). </p>


## :books: Objetivos do Projeto: 
  
Entender  como se dá a integração entre front e back-end (com banco de dados), além de entender como essa configuração pode ser feita utilizando o Docker Compose;


 ## :woman_juggling: Habilidades para o projeto:
  
 * Dockerização dos apps, network, volume e compose;
 * A modelagem de dados com MySQL através do Sequelize;
 * A criação e associação de tabelas usando models do sequelize;
 * A construção de uma API REST com endpoints para consumir os models criados;
 * A construção de um CRUD com TypeScript, utilizando ORM;
 
 ## 📋︎ Requisitos do projeto:
 
 Esse projeto é composto de 4 fluxos principais:

 * Teams (Times);
 * Users e Login (Pessoas Usuárias e Credenciais de acesso);
 * Matches (Partidas);
 * Leaderboards (Placares);
 
 `Exemplo do retorno esperado do placar dos times`
 
  <details>
 
 ```js
  [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  ...
];
  ```
  
   </details>
   
   `Requisitos`
  
 <details>
 
## Fluxo 1: Teams (Times)
 
1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de times.

2 - Desenvolva testes que cubram no mínimo 5 por cento dos arquivos em `/app/backend/src`, com um mínimo de 7 linhas cobertas.

3 - Desenvolva o endpoint `/teams` no back-end de forma que ele possa retornar todos os times corretamente.

4 - Desenvolva testes que cubram no mínimo 10 por cento dos arquivos em `/app/backend/src`, com um mínimo de 19 linhas cobertas.

5 - Desenvolva o endpoint `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico.

## Fluxo 2: Users e Login (Pessoas Usuárias e Credenciais de acesso)

6 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias.

7 - Desenvolva testes que cubram no mínimo 15 por cento dos arquivos em `/app/backend/src`, com um mínimo de 25 linhas cobertas.

8 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end.

9 - Desenvolva testes que cubram no mínimo 20 por cento dos arquivos em `/app/backend/src`, com um mínimo de 35 linhas cobertas.

10 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end.

11 - Desenvolva testes que cubram no mínimo 30 por cento dos arquivos em `/app/backend/src`, com um mínimo de 45 linhas cobertas.

12 - Desenvolva um middleware de validação para o `token`, verificando se ele é válido, e desenvolva o endpoint `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end.

## Fluxo 3: Matches (Partidas)

13 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de partidas.

14 - Desenvolva testes que cubram no mínimo 45 por cento dos arquivos em `/app/backend/src`, com um mínimo de 70 linhas cobertas.

15 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end.

16 - Desenvolva o endpoint `/matches` de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end.

17 - Desenvolva o endpoint `/matches/:id/finish` de modo que seja possível finalizar uma partida no banco de dados.

18 - Desenvolva o endpoint `/matches/:id` de forma que seja possível atualizar partidas em andamento.

19 - Desenvolva testes que cubram no mínimo 60 por cento dos arquivos em `/app/backend/src`, com um mínimo de 80 linhas cobertas.

20 - Desenvolva o endpoint `/matches` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados.

21 - Desenvolva o endpoint `/matches` de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times.

## Fluxo 4: Leaderboards (Placares)

22 - Desenvolva testes que cubram no mínimo 80 por cento dos arquivos em `/app/backend/src`, com um mínimo de 100 linhas cobertas

23 - Desenvolva o endpoint `/leaderboard/home` de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: `name`, `totalPoints`, `totalGames`, `totalVictories`, `totalDraws`, `totalLosses`, `goalsFavor` e `goalsOwn`.

24 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades `goalsBalance` e `efficiency`, além das propriedades do requisito anterior.

25 - Desenvolva o endpoint `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.

26 - Desenvolva o endpoint `/leaderboard/away` de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: `name`, `totalPoints`, `totalGames`, `totalVictories`, `totalDraws`, `totalLosses`, `goalsFavor` e `goalsOwn`.

27 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades `goalsBalance` e `efficiency`, além das propriedades do requisito anterior.

28 - Desenvolva o endpoint `/leaderboard/away` de forma que seja possível filtrar a classificação dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada.

 
 
</details>

## :wrench: Tecnologias utilizadas
  
* Docker
  
* Node.js

* Sequelize

* MySQL


