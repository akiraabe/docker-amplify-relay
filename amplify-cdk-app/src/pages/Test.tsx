import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RecordList } from '../components/RecordList';
import { recordByRaceId } from '../graphql/queries';

import { CreateRecordInput, RecordByRaceIdQuery } from '../API';
import { GraphQLResult } from '@aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Header } from '../components/Header';

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

  
  const openDetail = (record: CreateRecordInput) => {
    console.log('openDetail is pressed');
    console.log(record);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Header />
          <div style={styles.container}>
            <h2>区間別</h2>
            <RecordList records={records} openDetail={openDetail} setRecords={setRecords}/>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Go back to Top</Link>
                </li>
                <li>
                  <Link to='/SectionalPrize'>区間賞</Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </Authenticator>
  );
};

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    width: 450,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
};

export default Test;
