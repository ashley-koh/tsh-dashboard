import { NextFunction, Request, Response } from 'express';
import { CreateFormDto } from '@dtos/form.dto';
import { Form } from '@interfaces/form.interface';
import FormService from '@services/form.service';

class FormController {
  public formService = new FormService();

  public createForm = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formData: CreateFormDto = req.body;
      const createFormData: Form = await this.formService.createForm(formData);

      res.status(201).json({ data: createFormData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getFormById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formID: string = req.params.id;
      const findOneFormData: Form = await this.formService.findFormById(formID);

      res.status(201).json({ data: findOneFormData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getForms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFormsData: Form[] = await this.formService.findAllForms();
      res.status(201).json({ data: findAllFormsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public updateForm = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formId: string = req.params.id;
      const formData: CreateFormDto = req.body;

      const updateFormData: Form = await this.formService.updateForm(
        formId,
        formData,
      );

      res.status(201).json({ data: updateFormData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteForm = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formId = req.params.id;

      const deleteFormData: Form = await this.formService.deleteForm(formId);

      res.status(201).json({ data: deleteFormData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FormController;
