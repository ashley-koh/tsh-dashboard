// import { hash } from 'bcrypt';
import { CreateFormDto } from '@dtos/form.dto';
import { HttpException } from '@exceptions/HttpException';
import { Form } from '@interfaces/form.interface';
import formModel from '@models/form.model';
import { isEmpty } from '@utils/util';

class FormService {
  public forms = formModel;

  public async createForm(formData: CreateFormDto): Promise<Form> {
    if (isEmpty(formData)) throw new HttpException(400, 'formData is empty');

    const createFormData: Form = await this.forms.create({
      ...formData,
    });

    const populatedForm = await this.forms
      .findById(createFormData._id)
      .populate({
        path: 'sections',
        populate: {
          path: 'questions',
        },
      })
      .exec();

    return populatedForm;
  }

  public async findFormById(formId: string): Promise<Form> {
    if (isEmpty(formId)) throw new HttpException(400, 'formId is empty');

    const findFormData: Form = await this.forms
      .findOne({
        _id: formId,
      })
      .populate({
        path: 'sections',
        populate: {
          path: 'questions',
        },
      });

    if (!findFormData) throw new HttpException(409, "Form doesn't exist");

    return findFormData;
  }

  public async findAllForms(): Promise<Form[]> {
    const findAllFormsData: Form[] = await this.forms.find().populate({
      path: 'sections',
      populate: {
        path: 'questions',
      },
    });

    return findAllFormsData;
  }

  public async updateForm(
    formId: string,
    formData: CreateFormDto,
  ): Promise<Form> {
    if (isEmpty(formData)) throw new HttpException(400, 'formData is empty');
    if (isEmpty(formId)) throw new HttpException(400, 'formId is empty');

    const updateFormData: Form = await this.forms
      .findByIdAndUpdate(formId, formData)
      .populate({
        path: 'sections',
        populate: {
          path: 'questions',
        },
      });
    if (!updateFormData) throw new HttpException(409, "Question doesn't exist");
    return updateFormData;
  }

  public async deleteForm(formId: string): Promise<Form> {
    if (isEmpty(formId)) throw new HttpException(400, 'formId is empty');

    const deleteFormData: Form = await this.forms
      .findByIdAndDelete(formId)
      .populate({
        path: 'sections',
        populate: {
          path: 'questions',
        },
      });

    if (!deleteFormData) throw new HttpException(409, "Form doesn't exist");

    return deleteFormData;
  }
}
export default FormService;
