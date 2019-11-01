# LinkApp

collection link from \*

## skill
- front-end => react(use create-react-app generator) / react-router / super-agent(send HTTP Request)
- backend => Node.js(Express) / babel / nodemon / bcrypt 
- infrastructure　=> docker / postgresql / dotenv

Could you read package.json for details;

## function

- registration ... express session
- CRUD my link card ... postgres/express api/react
- routing ... react-router
- search link card ... react

## Get Started

At first please command `brew services stop postgresql` in your local.

1. clone this repository
2. `yarn install`
4. `docker-compose up --build -d`
5. `cd /LinkAppNew/backend` && `yarn start`
6. `cd /LinkAppNew/client` && `yarn start`

**this repositry need to install docker environment in your pc and set db information on .env(if don't exist, please create it)**

## Error

if you didn't create docker container to follow description above , try to halt postgres in your localhost. 

## 

https://www.dropbox.com/scl/fi/4fr7n7jiqfc4iuus74r2t/.paper?dl=0&rlkey=ewr8mnkmt6mmsljmsrsl1n1qn
