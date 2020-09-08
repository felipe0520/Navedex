# Navedex

Projeto de teste do backend

### Principais tecnologias utilizadas
1. Node
2. Typescript
3. Arquitetura MVC
4. Express
5. Dotenv
6. Jest
7. bcryptjs
8. jsonwebtoken
9. mysql
10. uuid
11. knex

### Escopo

O sistema consiste em um criador de navedex's, nele tu poderá se cadastrar utilizando email e senha, e então ao logar terá acesso ao banco de dados dos seus navers, possuindo informações como: nomes, data de nascimento, cargos, tempo de empresa e projetos que participou.

Você deve fazer a estrutura do banco de dados como achar necessário, mas lembrando que é obrigatório as entidades de users, navers e projetos estarem relacionadas entre si. Deve ser possível saber em quais projetos um naver está e vice-versa, tudo baseado no usuário que fez a requisição.


### O que o programa é capaz de fazer

#### Users

1. Cadastro de novos users
2. Login dos users

#### Navers

1. Cadastro de novos navers
2. Busca de todos os navers
3. Busca com filtro a partir do nome, data de admissão ou cargo
4. Busca detalhada com os projetos a partir do id
5. Atualização de navers
6. Deletar um naver

#### projeto

1. Cadastro de novos projetos
2. Busca de todos os projetos
3. Busca com filtro a partir do nome
4. Busca detalhada com os usuários participantes a partir do id
5. Atualização de projetos


### Como testar o projeto


No terminal, clone o projeto:

```git clone https://github.com/felipe0520/Navedex```

Entre na pasta do projeto  :
```cd Navedex ```

Instale as dependências : 
```npm install ```

Crie um arquivo .env com as configurações do seu banco de dados (preferencialmente MySQL, caso deseje utilizar outro, adaptações no código e dependências serão necessárias)
```
DB_HOST = seu_endereço_host
DB_USER = seu_usuário
DB_PASSWORD = sua_senha
DB_DATABASE_NAME = seu_banco_de_dados
JWT_KEY = chave_para_jwt
BCRYPT_COST = cost_encriptação (recomendado no mínimo 12)
```
Execute a aplicação:
```npm run start:dev  ```

Você poderá usar os enpoints através de um programa (Postman) com o endereço padrão http://localhost:3000.

Para mais detalhes, consulte a documentação : https://documenter.getpostman.com/view/10580422/TVCjw5b5


### Dificuldades

Tive dificuldades na realização de algumas query no mysql e consegui supli-las com pesquisa na internet e ajuda de um amigo.

Outra dificuldade que apresentei foi na transformação dos dados da tabela para a forma a ser exibida na resposta, consegui através de tentativas
e erros.
