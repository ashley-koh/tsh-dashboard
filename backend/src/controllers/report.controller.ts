import { NextFunction, Request, Response } from 'express';
import ReportService from '@services/report.service';

class ReportController {
  public reportService = new ReportService();

  public createReport = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const employeeId: string = req.params.id;
      const createReportData: string =
        await this.reportService.generateEmployeeReport(employeeId);

      res
        .status(200)
        .json({ data: createReportData, message: 'Report created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReportController;
