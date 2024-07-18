import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import QuestionRoute from '@routes/question.route';
import FormRoute from '@routes/form.route';
import AnswerRoutes from './routes/answer.route';
import App from './app';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new QuestionRoute(),
  new FormRoute(),
  new AnswerRoutes(),
]);

app.listen();
