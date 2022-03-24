import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as mutations from '../graphql/mutations';

import { RecordList } from '../components/RecordList';
import { recordByRaceId } from '../graphql/queries';

import { CreateRecordInput, RecordByRaceIdQuery } from '../API';
import { GraphQLResult } from '@aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Test = () => {
  const [records, setRecords] = useState<CreateRecordInput[]>([]);

  useEffect(() => {
    // TODO: 回数をハードコーディングしているのは暫定なので、いつかちゃんとする。
    fetchRecords(2);
  }, []);

  // 対象回数のデータを取得します。
  const fetchRecords = async (raceId: number) => {
    try {
      const recordData = (await API.graphql({
        query: recordByRaceId,
        variables: {
          raceId: raceId,
        },
      })) as GraphQLResult<RecordByRaceIdQuery>;
      if (recordData.data?.recordByRaceId?.items) {
        const records = recordData.data.recordByRaceId
          .items as CreateRecordInput[];
        setRecords(records);
      }
    } catch (err) {
      console.log('error fetching records');
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={styles.container}>
          <h2>Test Page</h2>
          <RecordList records={records} />
          <nav>
            <ul>
              <li>
                <Link to='/'>Go back to Top</Link>
              </li>
            </ul>
          </nav>
          <button onClick={async () => {
            await API.graphql({
              query: mutations.sendSummaryEmail
            })
          }}>Send summary email</button>
        </div>
      )}
    </Authenticator>
  );
};

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
};

export default Test;
