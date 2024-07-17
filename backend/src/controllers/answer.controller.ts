import { NextFunction, Request, Response } from 'express';
import { CreateAnswerDto } from '@dtos/answer.dto';
import { Answer } from '@interfaces/answer.interface';
import AnswerService from '@services/answer.service';

class AnswerController {
  public answerService = new AnswerService();

  public createAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const answerData: CreateAnswerDto = req.body;
      const createAnswerData: Answer =
        await this.answerService.createAnswer(answerData);

      res.status(201).json({ data: createAnswerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAnswerById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const answerId: string = req.params.id;
      const findOneAnswerData: Answer =
        await this.answerService.findAnswerById(answerId);

      res.status(201).json({ data: findOneAnswerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getAnswers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllAnswersData: Answer[] =
        await this.answerService.findAllAnswers();
      res.status(201).json({ data: findAllAnswersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public updateAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const answerId: string = req.params.id;
      const answerData: CreateAnswerDto = req.body;

      const updateAnswerData: Answer = await this.answerService.updateAnswer(
        answerId,
        answerData,
      );

      res.status(201).json({ data: updateAnswerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const answerId = req.params.id;

      const answerQuestionData: Answer =
        await this.answerService.deleteAnswer(answerId);

      res.status(201).json({ data: answerQuestionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AnswerController;
