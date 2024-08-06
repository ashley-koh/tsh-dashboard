import { ProgressProps } from "antd";

import AppraisalObj from "@/types/appraisal.type";
import User from "@/types/user.type";
import { LMS } from "@/data/mockData";
import { AxiosInstance } from "axios";
import { fetchAppraisal } from "@/services/appraisal.services";

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
 *              (Previous appraisal(s) rating %, default is 80%) x 50%
 *
 * @param user The user to calculate the overall rating for.
 *
 * @returns The rating of the user, from 0 to 100 (inclusive).
 */
export async function calculateOverallRating(client: AxiosInstance, user: User) {
  let moduleProgress: number = 0;
  for (const module of LMS.modules) { // LMS data from external source is mocked
    moduleProgress += module.progress;
  }

  const appraisalRatings: (number | undefined)[] = await Promise.all(
    user.appraisals.map(async appraisalId => {
      const appraisal: AppraisalObj = await fetchAppraisal(client, appraisalId);
      return appraisal.managee._id === user._id ? appraisal.rating : undefined;
    })
  );
  let appraisalRating: number = 0, numAppraisals: number = 0;
  for (const rating of appraisalRatings) {
    if (rating !== undefined) {
      appraisalRating += rating;
      numAppraisals++;
    }
  }

  console.log(`module: ${moduleProgress}, appraisal: ${appraisalRating}`);

  let result: number = moduleProgress / LMS.modules.length;
  if (numAppraisals > 0) {
    result = (result + appraisalRating / numAppraisals) / 2;
  }
  return Math.round(result * 100) / 100;  // round to 2dp
};
