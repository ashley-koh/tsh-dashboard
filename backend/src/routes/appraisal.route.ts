import { Router } from 'express';
import AppraisalController from '@controllers/appraisal.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateAppraisalDto } from '@dtos/appraisal.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class AppraisalRoutes implements Routes {
  public path = '/appraisal';

  public router = Router();

  public appraisalController = new AppraisalController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/createAppraisal`,
      validationMiddleware(CreateAppraisalDto, 'body'),
      this.appraisalController.createAppraisal,
    );

    this.router.get(
      `${this.path}/:id`,
      this.appraisalController.getAppraisalById,
    );

    this.router.get(`${this.path}`, this.appraisalController.getAppraisals);

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateAppraisalDto, 'body', true),
      this.appraisalController.updateAppraisal,
    );

    this.router.delete(
      `${this.path}/:id`,
      this.appraisalController.deleteAppraisal,
    );
  }
}

export default AppraisalRoutes;