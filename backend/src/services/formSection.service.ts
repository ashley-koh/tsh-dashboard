// import { hash } from 'bcrypt';
import { CreateFormSectionDto } from '@dtos/formSection.dto';
import { HttpException } from '@exceptions/HttpException';
import { FormSection } from '@interfaces/formSection.interface';
import formSectionModel from '@models/formSection.model';
import { isEmpty } from '@utils/util';

class FormSectionService {
  public formSections = formSectionModel;

  public async findAllFormSections(): Promise<FormSection[]> {
    const findAllFormSectionsData: FormSection[] = await this.formSections
      .find()
      .populate('questions');

    return findAllFormSectionsData;
  }

  public async findFormSectionById(
    formSectionId: string,
  ): Promise<FormSection> {
    if (isEmpty(formSectionId))
      throw new HttpException(400, 'formSectionId is empty');

    const findFormSectionData: FormSection = await this.formSections
      .findOne({
        _id: formSectionId,
      })
      .populate('questions');

    if (!findFormSectionData)
      throw new HttpException(409, "Form doesn't exist");

    return findFormSectionData;
  }

  public async createFormSection(
    formSectionData: CreateFormSectionDto,
  ): Promise<FormSection> {
    if (isEmpty(formSectionData))
      throw new HttpException(400, 'formSectionData is empty');

    const createFormSectionData: FormSection = await this.formSections.create({
      ...formSectionData,
    });

    const populatedFormSectionData = await this.formSections
      .findById(createFormSectionData._id)
      .populate('questions');

    return populatedFormSectionData;
  }

  public async updateFormSection(
    formSectionId: string,
    formSectionData: CreateFormSectionDto,
  ): Promise<FormSection> {
    if (isEmpty(formSectionData))
      throw new HttpException(400, 'formSectionData is empty');

    if (isEmpty(formSectionId))
      throw new HttpException(400, 'formSectionId is empty');

    const updateFormSectionData: FormSection = await this.formSections
      .findByIdAndUpdate(formSectionId, formSectionData)
      .populate('questions');

    if (!updateFormSectionData)
      throw new HttpException(409, "Question doesn't exist");

    return updateFormSectionData;
  }

  public async deleteFormSection(formSectionId: string): Promise<FormSection> {
    if (isEmpty(formSectionId))
      throw new HttpException(400, 'formSectionId is empty');

    const deleteFormSectionData: FormSection = await this.formSections
      .findByIdAndDelete(formSectionId)
      .populate('questions');

    if (!deleteFormSectionData)
      throw new HttpException(409, "FormSection doesn't exist");

    return deleteFormSectionData;
  }
}
export default FormSectionService;
