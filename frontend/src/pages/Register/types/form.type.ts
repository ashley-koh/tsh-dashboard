import { BaseUser } from "@/types/user.type";

interface IRegisterForm extends BaseUser {
  password: string;
  confirm: string;
  agreement: boolean;
};

export default IRegisterForm;
