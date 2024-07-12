import { NextFunction, Request, Response } from 'express';
import { CreateQuestionDto } from '@dtos/question.dto';
import { Question } from '@interfaces/question.interface';
import QuestionService from '@services/question.service';

class QuestionController {
  public questionService = new QuestionService();

  public createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const questionData: CreateQuestionDto = req.body;
      const createQuestionData: Question =
        await this.questionService.createQuestion(questionData);

      res.status(201).json({ data: createQuestionData, message: 'created' });
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

      res.status(201).json({ data: findOneQuestionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllQuestionsData: Question[] =
        await this.questionService.findAllQuestions();
      res.status(201).json({ data: findAllQuestionsData, message: 'findAll' });
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

      res.status(201).json({ data: updateQuestionData, message: 'updated' });
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

      res.status(201).json({ data: deleteQuestionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuestionController;
