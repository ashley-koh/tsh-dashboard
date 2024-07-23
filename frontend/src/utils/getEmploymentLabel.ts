const getEmploymentLabel = (
  role: "full_time" | "part_time" | "intern" | "temp"
) => {
  const mapping = {
    full_time: "Full time",
    part_time: "Part time",
    intern: "Intern",
    temp: "Temporary",
  };

  return mapping[role];
};

export default getEmploymentLabel;
