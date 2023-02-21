import dotenv from 'dotenv'

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

const DB_NAME = process.env.DEV_DB_NAME || ''
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@renteasecluster.fkbqbzj.mongodb.net/${DB_NAME}`;

export const config = {
  mongo: {
    uri: MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  server: {
    port: SERVER_PORT,
  },
};
