import { Router } from 'express';
import FormSectionController from '@controllers/formSection.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateFormSectionDto } from '@dtos/formSection.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class FormSectionRoutes implements Routes {
  public path = '/formSection';

  public router = Router();

  public formSectionController = new FormSectionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      validationMiddleware(CreateFormSectionDto, 'body'),
      this.formSectionController.createFormSection,
    );

    this.router.get(
      `${this.path}/:id`,
      this.formSectionController.getFormSectionById,
    );

    this.router.get(`${this.path}`, this.formSectionController.getFormSections);

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateFormSectionDto, 'body', true),
      this.formSectionController.updateFormSection,
    );

    this.router.delete(
      `${this.path}/:id`,
      this.formSectionController.deleteFormSection,
    );
  }
}

export default FormSectionRoutes;
