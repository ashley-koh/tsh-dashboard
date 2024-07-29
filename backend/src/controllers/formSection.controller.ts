import { NextFunction, Request, Response } from 'express';
import { CreateFormSectionDto } from '@dtos/formSection.dto';
import { FormSection } from '@interfaces/formSection.interface';
import FormSectionService from '@services/formSection.service';

class FormSectionController {
  public formSectionService = new FormSectionService();

  public getFormSections = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllFormSectionsData: FormSection[] =
        await this.formSectionService.findAllFormSections();
      res.status(200).json({
        data: findAllFormSectionsData,
        message: 'findAll formSection',
      });
    } catch (error) {
      next(error);
    }
  };

  public getFormSectionById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formSectionID: string = req.params.id;
      const findOneFormSectionData: FormSection =
        await this.formSectionService.findFormSectionById(formSectionID);

      res.status(200).json({
        data: findOneFormSectionData,
        message: 'findOne formSection',
      });
    } catch (error) {
      next(error);
    }
  };

  public createFormSection = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formSectionData: CreateFormSectionDto = req.body;
      const createFormSectionData: FormSection =
        await this.formSectionService.createFormSection(formSectionData);

      res
        .status(201)
        .json({ data: createFormSectionData, message: 'created formSection' });
    } catch (error) {
      next(error);
    }
  };

  public updateFormSection = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formSectionId: string = req.params.id;
      const formSectionData: CreateFormSectionDto = req.body;

      const updateFormSectionData: FormSection =
        await this.formSectionService.updateFormSection(
          formSectionId,
          formSectionData,
        );

      res
        .status(200)
        .json({ data: updateFormSectionData, message: 'updated formSection' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFormSection = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const formSectionId = req.params.id;

      const deleteFormSectionData: FormSection =
        await this.formSectionService.deleteFormSection(formSectionId);

      res
        .status(200)
        .json({ data: deleteFormSectionData, message: 'deleted formSection' });
    } catch (error) {
      next(error);
    }
  };
}

export default FormSectionController;
