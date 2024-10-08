import { Router } from 'express';
import AnswerController from '@controllers/answer.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateAnswerDto } from '@dtos/answer.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class AnswerRoutes implements Routes {
  public path = '/answers';

  public router = Router();

  public answerController = new AnswerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.answerController.getAnswers);

    this.router.get(`${this.path}/:id`, this.answerController.getAnswerById);

    this.router.post(
      `${this.path}/`,
      validationMiddleware(CreateAnswerDto, 'body'),
      this.answerController.createAnswer,
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateAnswerDto, 'body', true),
      this.answerController.updateAnswer,
    );

    this.router.delete(`${this.path}/:id`, this.answerController.deleteAnswer);
  }
}

export default AnswerRoutes;
