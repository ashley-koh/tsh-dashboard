import { Router } from 'express';
import FormController from '@controllers/form.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateFormDto } from '@dtos/form.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class FormRoutes implements Routes {
  public path = '/form';

  public router = Router();

  public formController = new FormController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.formController.getForms);

    this.router.get(`${this.path}/:id`, this.formController.getFormById);

    this.router.post(
      `${this.path}/`,
      validationMiddleware(CreateFormDto, 'body'),
      this.formController.createForm,
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateFormDto, 'body', true),
      this.formController.updateForm,
    );

    this.router.delete(`${this.path}/:id`, this.formController.deleteForm);
  }
}

export default FormRoutes;
