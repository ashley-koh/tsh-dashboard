import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import QuestionsRoute from '@routes/question.route';
import FormsRoute from '@routes/form.route';
import FormSectionsRoute from '@routes/formSection.route';
import AnswersRoute from './routes/answer.route';
import EmailsRoute from './routes/email.route';
import AppraisalsRoute from './routes/appraisal.route';
import ReportsRoute from './routes/report.route';
import App from './app';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new QuestionsRoute(),
  new FormsRoute(),
  new FormSectionsRoute(),
  new AnswersRoute(),
  new EmailsRoute(),
  new AppraisalsRoute(),
  new ReportsRoute(),
]);

app.listen();
