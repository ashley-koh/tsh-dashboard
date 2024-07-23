// import { hash } from 'bcrypt';
import { CreateAppraisalDto } from '@dtos/appraisal.dto';
import { HttpException } from '@exceptions/HttpException';
import { Appraisal } from '@interfaces/appraisal.interface';
import appraisalModel from '@models/appraisal.model';
import { isEmpty } from '@utils/util';

class AppraisalSerivce {
  public appraisal = appraisalModel;

  public async createAppraisal(
    appraisalData: CreateAppraisalDto,
  ): Promise<Appraisal> {
    if (isEmpty(appraisalData))
      throw new HttpException(400, 'appraisalData is empty');

    const createAppraisalData: Appraisal = await this.appraisal.create({
      ...appraisalData,
    });

    return createAppraisalData;
  }

  public async findAppraisalById(appraisalId: string): Promise<Appraisal> {
    if (isEmpty(appraisalId))
      throw new HttpException(400, 'AppraisalID is empty');

    const findAppraisal: Appraisal = await this.appraisal.findOne({
      _id: appraisalId,
    });
    if (!findAppraisal) throw new HttpException(409, "Appraisal doesn't exist");

    return findAppraisal;
  }

  public async findAllAppraisals(): Promise<Appraisal[]> {
    const AllAppraisalsData: Appraisal[] = await this.appraisal.find();
    return AllAppraisalsData;
  }

  public async updateAppraisal(
    appraisalId: string,
    appraisalData: CreateAppraisalDto,
  ): Promise<Appraisal> {
    if (isEmpty(appraisalData))
      throw new HttpException(400, 'appraisalData is empty');
    if (isEmpty(appraisalId))
      throw new HttpException(400, 'appraisalId is empty');

    const updateAppraisalData: Appraisal =
      await this.appraisal.findByIdAndUpdate(appraisalId, appraisalData);

    if (!updateAppraisalData)
      throw new HttpException(409, "Appraisal doesn't exist");
    return updateAppraisalData;
  }

  public async deleteAppraisal(appraisalId: string): Promise<Appraisal> {
    if (isEmpty(appraisalId))
      throw new HttpException(400, 'appraisalId is empty');

    const deleteAppraisalData: Appraisal =
      await this.appraisal.findByIdAndDelete(appraisalId);

    if (!deleteAppraisalData)
      throw new HttpException(409, "Appraisal doesn't exist");

    return deleteAppraisalData;
  }
}
export default AppraisalSerivce;
