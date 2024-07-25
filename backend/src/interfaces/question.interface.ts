export interface Question {
  _id: string;
  description: string;
  type: number;
  required: boolean;
  answerId: string;
}
