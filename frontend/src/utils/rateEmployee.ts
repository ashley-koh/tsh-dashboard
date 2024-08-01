import { ProgressProps } from "antd";

import User from "@/types/user.type";
import { LMS } from "@/data/mockData";

export const HIGH_KPI_THRESHOLD = 80;
export const AVERAGE_KPI_THRESHOLD = 60;

export const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#eb2a27",
  "100%": "#108ee9",
};

/**
 * Calculates user rating from their appraisal ratings and module ratings (from LMS).
 *
 * The formula to calculate user rating is as follows:
 *     Rating = (Module progress average %) x 50% +
 *              (Previous appraisal rating %, default is 80%) x 50%
 *
 * @param user The user to calculate the overall rating for.
 *
 * @returns The rating of the user, from 0 to 100 (inclusive).
 */
export function calculateOverallRating(user: User) {
  let moduleProgress: number = 0;
  for (const module of LMS.modules) { // LMS data from external source is mocked
    moduleProgress += module.progress;
  }
  return Math.round((moduleProgress / LMS.modules.length + (user?.rating || 80)) * 50) / 100;
};
