import User from "@/types/user.type";

interface RegisterForm extends User {
  confirm: string;
  agreement: boolean;
}

export default RegisterForm;
