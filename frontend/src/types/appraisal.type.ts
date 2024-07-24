type Appraisal = {
  _id?: string,
  manageeId: string,
  managerId: string,
  formId: string,
  reviewId: string,
  status: 'in review' | 'post review' | 'completed',
  deadline: Date,
  answers: string,
};

export default Appraisal;
