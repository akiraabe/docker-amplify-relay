import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecordList } from '../components/RecordList';
import { listRecords, recordByRaceIdAndTeam } from '../graphql/queries';

import { ListRecordsQuery, CreateRecordInput, RecordByRaceIdAndTeamQuery } from '../API';
import { GraphQLResult } from '@aws-amplify/api';
const Test = () => {
  const [records, setRecords] = useState<CreateRecordInput[]>([]);

  useEffect(() => {
    fetchRecords(2);
  }, []);

  // 対象回数のデータを取得します。
  const fetchRecords = async (raceId: number) => {
    try {
      const recordData = (await API.graphql(
        ({
          query: recordByRaceIdAndTeam,
          variables: {
            raceId: raceId,
          },
        })
      )) as GraphQLResult<RecordByRaceIdAndTeamQuery>;
      if (recordData.data?.recordByRaceIdAndTeam?.items) {
        const records = recordData.data.recordByRaceIdAndTeam
          .items as CreateRecordInput[];
        setRecords(records);
      }
    } catch (err) {
      console.log('error fetching records');
    }
  };

  return (
    <>
      <RecordList records={records} />
      <nav>
        <ul>
          <li>
            <Link to='/'>Go back to Top</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Test;
