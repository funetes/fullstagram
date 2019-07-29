import './env';
import {GraphQLServer} from 'graphql-yoga';
import morgan from 'morgan';
import schema from './schema';
import passport from 'passport';
import { authenticateJwt } from './passport';
const PORT = process.env.PORT || 4000;


const server = new GraphQLServer(
  {schema,
  context : ({request})=>({request})
  }
);
server.express.use(morgan('dev'));
server.express.use(authenticateJwt);
passport.initialize();
// 이제부터는 인증된 유저가 옴

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
