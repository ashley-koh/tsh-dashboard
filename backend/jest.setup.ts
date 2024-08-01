import fc from 'fast-check';
import fs from 'fs';
import process from 'process';
import { FUZZ, FC_NUM_RUNS, FUZZ_TIMEOUT } from '@config';

let numRuns: number = 10;
let timeLimit: number = 5_000;

if (FC_NUM_RUNS) {
  numRuns = parseInt(process.env.FC_NUM_RUNS, 10);
}

// If FUZZ === true, continuously FUZZ
if (FUZZ) {
  numRuns = Number.POSITIVE_INFINITY;
  timeLimit = parseInt(FUZZ_TIMEOUT, 10); // 24 hours
  jest.setTimeout(timeLimit);
}
fc.configureGlobal({ numRuns, interruptAfterTimeLimit: timeLimit });

let failureId = 0;
function reportFailure(inputs, error) {
  failureId += 1;
  const fileName = `./logs/failure-pid${process.pid}-${failureId}.log`;
  const fileContent = `Counterexample: ${fc.stringify(inputs)}\n\nError: ${error}`;
  fs.writeFile(fileName, fileContent, () => {});
}

export const neverFailingPredicateIfFuzzing = (predicate) => {
  if (FUZZ) {
    return async (...inputs) => {
      try {
        const out = await predicate(...inputs);
        if (out === false) {
          reportFailure(inputs, undefined);
        }
      } catch (err) {
        reportFailure(inputs, err);
      }
    };
  }
  return (...inputs) => predicate(...inputs);
};

let session: string | null = null;

export const getSession = () => session;

export const setSession = (value: string) => {
  console.log('session token has been set');
  session = value;
};
