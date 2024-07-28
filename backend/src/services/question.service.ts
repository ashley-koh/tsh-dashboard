// import { hash } from 'bcrypt';
import { CreateQuestionDto } from '@dtos/question.dto';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@interfaces/question.interface';
import questionModel from '@models/question.model';
import { isEmpty } from '@utils/util';

class QuestionService {
  public questions = questionModel;

  public async findAllQuestions(): Promise<Question[]> {
    const questions: Question[] = await this.questions.find();
    return questions;
  }

  public async findQuestionById(questionID: string): Promise<Question> {
    if (isEmpty(questionID))
      throw new HttpException(400, 'QuestionId is empty');

    const findQuestion: Question = await this.questions.findOne({
      _id: questionID,
    });
    if (!findQuestion) throw new HttpException(409, "Question doesn't exist");

    return findQuestion;
  }

  public async createQuestion(
    questionData: CreateQuestionDto,
  ): Promise<Question> {
    if (isEmpty(questionData))
      throw new HttpException(400, 'questionData is empty');

    const createQuestionData: Question = await this.questions.create({
      ...questionData,
    });

    return createQuestionData;
  }

  public async updateQuestion(
    questionId: string,
    questionData: CreateQuestionDto,
  ): Promise<Question> {
    if (isEmpty(questionData))
      throw new HttpException(400, 'questionData is empty');
    if (isEmpty(questionId))
      throw new HttpException(400, 'questionId is empty');

    const updateQuestionData: Question = await this.questions.findByIdAndUpdate(
      questionId,
      questionData,
    );
    if (!updateQuestionData)
      throw new HttpException(409, "Question doesn't exist");
    return updateQuestionData;
  }

  public async deleteQuestion(questionId: string): Promise<Question> {
    if (isEmpty(questionId))
      throw new HttpException(400, 'questionId is empty');

    const deleteQuestionData: Question =
      await this.questions.findByIdAndDelete(questionId);

    if (!deleteQuestionData)
      throw new HttpException(409, "Question doesn't exist");

    return deleteQuestionData;
  }
}
export default QuestionService;
