export const formateDate = (birthDate: string, needType: "dote" | "dash") => {
  if (needType === "dote") return birthDate.split("-").reverse().join(".");
  else return birthDate.split(".").reverse().join("-");
};
