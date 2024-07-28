import PDFDocument from 'pdfkit';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import appraisalModel from '@/models/appraisal.model';
import AnswerService from './answer.service';

class ReportService {
  public users = userModel;

  public appraisals = appraisalModel;

  public answerService = new AnswerService();

  public async generateEmployeeReport(employeeID: string): Promise<string> {
    if (isEmpty(employeeID)) throw new HttpException(400, 'UserId is empty');

    // Find the user
    const findUser = await this.users.findOne({ employeeId: employeeID });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    // Find Appraisals
    const findAppraisals = await this.appraisals.find({
      manageeId: employeeID,
    });
    if (!findAppraisals || findAppraisals.length === 0)
      throw new HttpException(409, 'User does not have appraisals');

    // Create directory if it doesn't exist
    const dir = 'src/temp';
    const mkdir = promisify(fs.mkdir);
    await mkdir(dir);

    // Define the path to save the PDF file
    const filePath = path.join(dir, `employee_report_${employeeID}.pdf`);

    // Create a new PDF document
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the PDF document to the file write stream
    doc.pipe(writeStream);

    // Add content to the PDF document
    doc
      .fontSize(20)
      .text(`Employee Report for ${this.capitalizeWords(findUser.name)}`, {
        align: 'center',
      });
    doc.moveDown();

    doc.fontSize(14).text(`Employee ID: ${findUser.employeeId}`);
    doc.moveDown();

    doc.fontSize(16).text('Appraisals:', { underline: true });

    findAppraisals.forEach(async (appraisal, index) => {
      doc.moveDown();
      doc.fontSize(14).text(`Appraisal ${index + 1}`);
      doc.fontSize(12).text(`Deadline: ${appraisal.deadline}`);

      doc.text(`Comments: ${appraisal.comments}`);
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

  public capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export default ReportService;
