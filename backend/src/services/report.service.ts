import PDFDocument from 'pdfkit';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import appraisalModel from '@/models/appraisal.model';

class ReportService {
  public users = userModel;

  public appraisals = appraisalModel;

  public async generateEmployeeReport(employeeId: string): Promise<string> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'UserId is empty');

    // Find the user
    const findUser = await this.users.findOne({ employeeId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    // Find Appraisals
    const findAppraisals = await this.appraisals.find({
      manageeId: employeeId,
    });
    if (!findAppraisals || findAppraisals.length === 0)
      throw new HttpException(409, 'User does not have appraisals');

    // Create directory if it doesn't exist
    const dir = 'src/temp';
    const mkdir = promisify(fs.mkdir);
    await mkdir(dir);

    // Define the path to save the PDF file
    const filePath = path.join(dir, `employee_report_${employeeId}.pdf`);

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

    findAppraisals.forEach((appraisal, index) => {
      doc.moveDown();
      doc.fontSize(14).text(`Appraisal ${index + 1}`);
      doc.fontSize(12).text(`Deadline: ${appraisal.deadline}`);
      doc.text(`Comments: ${appraisal.answers}`);
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
