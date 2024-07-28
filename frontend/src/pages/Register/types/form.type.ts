import { BaseUser } from "@/types/user.type";

interface RegisterForm extends BaseUser {
  confirm: string;
  agreement: boolean;
};

export default RegisterForm;
