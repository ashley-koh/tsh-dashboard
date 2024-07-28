import { NextFunction, Request, Response } from 'express';
import { CreateQuestionDto } from '@dtos/question.dto';
import { Question } from '@interfaces/question.interface';
import QuestionService from '@services/question.service';

class QuestionController {
  public questionService = new QuestionService();

  public getQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllQuestionsData: Question[] =
        await this.questionService.findAllQuestions();
      res
        .status(200)
        .json({ data: findAllQuestionsData, message: 'findAll question' });
    } catch (error) {
      next(error);
    }
  };

  public getQuestionById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const questionID: string = req.params.id;
      const findOneQuestionData: Question =
        await this.questionService.findQuestionById(questionID);

      res
        .status(200)
        .json({ data: findOneQuestionData, message: 'findOne question' });
    } catch (error) {
      next(error);
    }
  };

  public createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const questionData: CreateQuestionDto = req.body;
      const createQuestionData: Question =
        await this.questionService.createQuestion(questionData);

      res
        .status(201)
        .json({ data: createQuestionData, message: 'created question' });
    } catch (error) {
      next(error);
    }
  };

  public updateQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const questionId: string = req.params.id;
      const questionData: CreateQuestionDto = req.body;

      const updateQuestionData: Question =
        await this.questionService.updateQuestion(questionId, questionData);

      res
        .status(200)
        .json({ data: updateQuestionData, message: 'updated question' });
    } catch (error) {
      next(error);
    }
  };

  public deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const questionId = req.params.id;

      const deleteQuestionData: Question =
        await this.questionService.deleteQuestion(questionId);

      res
        .status(200)
        .json({ data: deleteQuestionData, message: 'deleted question' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuestionController;
