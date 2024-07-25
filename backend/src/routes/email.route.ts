import { Router } from 'express';
import EmailController from '@controllers/email.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateEmailDto } from '@dtos/email.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class EmailRoutes implements Routes {
  public path = '/email';

  public router = Router();

  public emailController = new EmailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmailDto, 'body'),
      this.emailController.sendEmail,
    );
  }
}

export default EmailRoutes;
