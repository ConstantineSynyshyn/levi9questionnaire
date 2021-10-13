import { LeftTimeType } from "../../types";
// @deprecated utils/index instead
export const getTimeLeftString = (leftTimeConfig: LeftTimeType): string => {
  const list = [];
  const { seconds, minutes, hours } = leftTimeConfig;
  if (hours) {
    list.push(`${hours} h`);
  }
  if (minutes) {
    list.push(`${minutes} m`);
  }
  if (minutes || seconds) {
    list.push(`${seconds} s`);
  }
  return list.join(" ");
};
