import PDFDocument from 'pdfkit';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import fs from 'fs';
import path from 'path';
import appraisalModel from '@/models/appraisal.model';
import questionModel from '@/models/question.model';
import answerModel from '@/models/answer.model';
import formModel from '@/models/form.model';
import FormService from './form.service';
import QuestionService from './question.service';
import AnswerService from './answer.service';

class ReportService {
  public users = userModel;

  public appraisals = appraisalModel;

  public questions = questionModel;

  public answers = answerModel;

  public forms = formModel;

  public formService = new FormService();

  public questionService = new QuestionService();

  public answerService = new AnswerService();

  public async generateEmployeeReport(employeeId: string): Promise<string> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'UserId is empty');

    // Find User Data
    const findUser = await this.users.findOne({ employeeId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    // Find Appraisal Data
    const findAppraisals = await this.appraisals.find({
      manageeId: employeeId,
    });

    if (!findAppraisals || findAppraisals.length === 0) {
      throw new HttpException(409, 'User does not have appraisals');
    }

    // Collect all necessary data
    const appraisalDataList = await Promise.all(
      findAppraisals.map(async (appraisal) => {
        const { formId } = appraisal;
        const findFormData = await this.formService.findFormById(formId);
        const { title, questions } = findFormData.section;

        const questionDataList = await Promise.all(
          questions.map(async (question) => {
            const findQuestionData =
              await this.questionService.findQuestionById(question);
            const { description: questionText, answerId } = findQuestionData;
            const getAnswerData =
              await this.answerService.findAnswerById(answerId);
            const { rating } = getAnswerData;

            return {
              questionText,
              rating,
            };
          }),
        );

        return {
          index: findAppraisals.indexOf(appraisal) + 1,
          deadline: appraisal.deadline,
          title,
          questions: questionDataList,
        };
      }),
    );

    // Create directory if it doesn't exist
    const dir = 'src/temp';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // Define the path to save the PDF file
    const filePath = path.join(dir, `employee_report_${employeeId}.pdf`);

    // Create a new PDF document
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the PDF document to the file write stream
    doc.pipe(writeStream);

    // Add content to the PDF document
    const { name, employeeId: userId } = findUser;

    doc.fontSize(20).text(`Employee Report for ${this.capitalizeWords(name)}`, {
      align: 'center',
    });
    doc.moveDown();

    doc.fontSize(14).text(`Employee ID: ${userId}`);
    doc.moveDown();

    doc.fontSize(16).text('Appraisals:', { underline: true });

    appraisalDataList.forEach((appraisal) => {
      const { index, deadline, title, questions } = appraisal;

      doc.moveDown();
      doc.fontSize(14).text(`Appraisal ${index}`);
      doc.fontSize(12).text(`Deadline: ${new Date(deadline).toDateString()}`);
      doc.moveDown();
      doc.fontSize(14).text(`Section: ${title}`, { underline: true });

      questions.forEach((question, qIndex) => {
        const { questionText, rating } = question;

        doc.moveDown();
        doc.fontSize(12).text(`Question ${qIndex + 1}: ${questionText}`);
        doc.fontSize(12).text(`Answer: ${rating}`);
      });
    });

    // Finalize the PDF and end the stream
    doc.end();

    // Wait for the write stream to finish
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Return the path to the generated PDF file
    return filePath;
  }

  public capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export default ReportService;
