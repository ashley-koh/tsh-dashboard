const getDeptLabel = (dept: "hr" | "others") => {
  const deptMapping = {
    hr: "Human Resources (HR)",
    others: "Others",
  };

  return deptMapping[dept];
};

export default getDeptLabel;
