import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} from '@config';

const dbConnection = {
  url: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default dbConnection;
