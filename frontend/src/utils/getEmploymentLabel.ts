import { EmploymentStatusOptions } from "@/types/user.type";

const getEmploymentLabel = (employment: EmploymentStatusOptions) => {
  const mapping = {
    full_time: "Full time",
    part_time: "Part time",
    intern: "Intern",
    temp: "Temporary",
  };

  return mapping[employment];
};

export default getEmploymentLabel;
