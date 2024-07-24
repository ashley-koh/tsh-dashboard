import { Router } from 'express';
import ReportController from '@controllers/report.controller';

import { Routes } from '@interfaces/routes.interface';

class ReportRoute implements Routes {
  public path = '/report';

  public router = Router();

  public reportController = new ReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.reportController.createReport);
  }
}

export default ReportRoute;
