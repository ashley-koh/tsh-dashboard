import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import dayjs from 'dayjs';

import { LMS } from '@/data/mockData';
import AnswerObj from '@/types/answer.type';
import AppraisalObj from '@/types/appraisal.type';
import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchAppraisal } from '@/services/appraisal.services';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

function dateToString(date: Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

const UserReport: React.FC<{ user: User }> = ({ user }) => {
  const client = axiosClient();
  const [appraisals, setAppraisals] = useState<AppraisalObj[]>([]);

  /** Run this once on page load */
  useEffect(() => {
    const loadData = async () => {
      const userAppraisals: AppraisalObj[] = await Promise.all(
        user.appraisals.map(async appraisalId => await fetchAppraisal(client, appraisalId))
      );
      setAppraisals(userAppraisals.slice(-3));
    };

    loadData();
  }, []);

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.title}>
          <Text>Employee Report</Text>
        </View>
        <View style={styles.section}>
          <Text>Name: {user.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Employee ID: {user.employeeId}</Text>
        </View>
        <View style={styles.section}>
          <Text>Job Title: {user.jobTitle}</Text>
        </View>

        <View style={styles.title}>
          <Text>Appraisals</Text>
        </View>
        {appraisals.map((appraisal, index) => (
          <div key={index}>
            <View style={styles.subTitle}>
              <Text>Conducted By: {appraisal.manager.name}</Text>
            </View>
            <View style={styles.section}>
              <Text>Job Title: {appraisal.manager.jobTitle}</Text>
            </View>
            <View style={styles.section}>
              <Text>Date of Review: {dateToString(appraisal.deadline)}</Text>
            </View>
            <View style={styles.section}>
              <Text>
                Given Rating: {appraisal.rating ?
                  `${appraisal.rating}%` :
                  'Not Yet Reviewed'
                }
              </Text>
            </View>
          </div>
        ))}

        <View style={styles.title}>
          <Text>Training Modules</Text>
        </View>
        {LMS.modules.map((module, index) => (
          <View key={index} style={styles.section}>
            <Text>{module.name} [ {module.progress}% ]</Text>
          </View>
        ))}

        <View style={styles.title}>
          <Text>Overall Rating: {user.rating}%</Text>
        </View>
      </Page>

      {appraisals.map((appraisal, appraisalIndex) => (
        <Page key={`page-${appraisalIndex}`}>
          <View style={styles.title}>
            <Text>Review between {appraisal.manager.name} and {appraisal.managee.name}</Text>
          </View>
          <View style={styles.section}>
            <Text>Date of Review: {dateToString(appraisal.deadline)}</Text>
          </View>
          <View style={styles.section}>
            <Text>
              Given Rating: {appraisal.rating ?
                `${appraisal.rating}%` :
                'Not Yet Reviewed'
              }
            </Text>
            <Text>
              Comments: {appraisal.comments || 'None'}
            </Text>
          </View>

          {appraisal.form.sections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              <View style={styles.title}>
                <Text>{section.title}</Text>
              </View>
              {section.description ? (
                <View style={styles.section}>
                  <Text>{section.description}</Text>
                </View>
              ) : null}

              {section.questions.map((question, questionIndex) => {
                const answer: AnswerObj | undefined =
                  appraisal.answers.find(answer => answer.question._id === question._id);

                return (
                  <div key={`question-${questionIndex}`}>
                    <View style={styles.subTitle}>
                      <Text>{question.description}</Text>
                    </View>
                    {answer ? (
                      <>
                        {answer.rating === undefined ? null : (
                          <View style={styles.section}>
                            <Text>Rating: {answer.rating}</Text>
                          </View>
                        )}
                        {answer.openEndedAnswer ? (
                          <View style={styles.section}>
                            <Text>{answer.openEndedAnswer}</Text>
                          </View>
                        ) : null}
                      </>
                    ) : (
                      <View style={styles.section}>
                        <Text>No answer provided.</Text>
                      </View>
                    )}
                  </div>
                );
            })}
            </div>
          ))}
        </Page>
      ))}
    </Document>
  );
};

export default UserReport;
