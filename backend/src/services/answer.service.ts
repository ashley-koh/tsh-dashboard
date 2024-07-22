// import { hash } from 'bcrypt';
import { CreateAnswerDto } from '@dtos/answer.dto';
import { HttpException } from '@exceptions/HttpException';
import { Answer } from '@interfaces/answer.interface';
import answerModel from '@models/answer.model';
import { isEmpty } from '@utils/util';

class AnswerService {
  public answers = answerModel;

  public async createAnswer(answerData: CreateAnswerDto): Promise<Answer> {
    if (isEmpty(answerData))
      throw new HttpException(400, 'answerData is empty');

    const createAnswerData: Answer = await this.answers.create({
      ...answerData,
    });

    return createAnswerData;
  }

  public async findAnswerById(answerId: string): Promise<Answer> {
    if (isEmpty(answerId)) throw new HttpException(400, 'AnswerId is empty');

    const findAnswer: Answer = await this.answers.findOne({
      _id: answerId,
    });
    if (!findAnswer) throw new HttpException(409, "Answer doesn't exist");

    return findAnswer;
  }

  public async findAllAnswers(): Promise<Answer[]> {
    const answers: Answer[] = await this.answers.find();
    return answers;
  }

  public async updateAnswer(
    answerId: string,
    answerData: CreateAnswerDto,
  ): Promise<Answer> {
    if (isEmpty(answerData))
      throw new HttpException(400, 'answerData is empty');
    if (isEmpty(answerId)) throw new HttpException(400, 'answerId is empty');

    const updateAnswerData: Answer = await this.answers.findByIdAndUpdate(
      answerId,
      answerData,
    );
    if (!updateAnswerData) throw new HttpException(409, "Answer doesn't exist");
    return updateAnswerData;
  }

  public async deleteAnswer(answerId: string): Promise<Answer> {
    if (isEmpty(answerId)) throw new HttpException(400, 'answerId is empty');

    const deleteAnswerData: Answer =
      await this.answers.findByIdAndDelete(answerId);

    if (!deleteAnswerData) throw new HttpException(409, "Answer doesn't exist");

    return deleteAnswerData;
  }
}
export default AnswerService;
