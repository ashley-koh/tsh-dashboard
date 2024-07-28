import { Router } from 'express';
import QuestionController from '@controllers/question.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateQuestionDto } from '@dtos/question.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class QuestionsRoute implements Routes {
  public path = '/questions';

  public router = Router();

  public questionController = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.questionController.getQuestions);

    this.router.get(
      `${this.path}/:id`,
      this.questionController.getQuestionById,
    );

    this.router.post(
      `${this.path}/`,
      validationMiddleware(CreateQuestionDto, 'body'),
      this.questionController.createQuestion,
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateQuestionDto, 'body', true),
      this.questionController.updateQuestion,
    );

    this.router.delete(
      `${this.path}/:id`,
      this.questionController.deleteQuestion,
    );
  }
}

export default QuestionsRoute;
