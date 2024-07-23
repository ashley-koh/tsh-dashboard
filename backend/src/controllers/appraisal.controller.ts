import { NextFunction, Request, Response } from 'express';
import { CreateAppraisalDto } from '@dtos/appraisal.dto';
import { Appraisal } from '@interfaces/appraisal.interface';
import AppraisalService from '@services/appraisal.service';

class AppraisalController {
  public appraisalService = new AppraisalService();

  public createAppraisal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const appraisalData: CreateAppraisalDto = req.body;
      const createAppraisalData: Appraisal =
        await this.appraisalService.createAppraisal(appraisalData);

      res
        .status(201)
        .json({ data: createAppraisalData, message: 'created appraisal' });
    } catch (error) {
      next(error);
    }
  };

  public getAppraisalById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const appraisalId: string = req.params.id;
      const findOneAppraisalData: Appraisal =
        await this.appraisalService.findAppraisalById(appraisalId);

      res.status(201).json({ data: findOneAppraisalData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getAppraisals = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllAppraisalData: Appraisal[] =
        await this.appraisalService.findAllAppraisals();
      res.status(201).json({ data: findAllAppraisalData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public updateAppraisal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const appraisalId: string = req.params.id;
      const appraisalData: CreateAppraisalDto = req.body;

      const updateAppraisalData: Appraisal =
        await this.appraisalService.updateAppraisal(appraisalId, appraisalData);

      res.status(201).json({ data: updateAppraisalData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAppraisal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const appraisalId = req.params.id;

      const deleteAppraisalData: Appraisal =
        await this.appraisalService.deleteAppraisal(appraisalId);

      res.status(201).json({ data: deleteAppraisalData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AppraisalController;
