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

const SectionalPrize = () => {
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
        const first = filterBySection(1, records);
        const second = filterBySection(2, records);
        const third = filterBySection(3, records);
        const fourth = filterBySection(4, records);
        const sectionalPrizes = first.concat(second, third, fourth);
        setRecords(sectionalPrizes);
      }
    } catch (err) {
      console.log('error fetching records');
    }
  };

   /**
   * 各区間の最速ランナーを返す
   * @param {*} section
   * @param {*} items
   * @returns
   */
    const filterBySection = (section: number, items: any) => {
      const filtered = items.filter((item: { section: number; }) => item.section === section);
      filtered.sort((a: { result: string; }, b: { result: string; }) => {
        if (a.result > b.result) {
          return 1;
        } else {
          return -1;
        }
      });
      const best = filtered.slice(0, 1);
      return best;
    };
    const removeRecord = () => {
      console.log('removeRecord is pressed');
    };
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Header />
          <div style={styles.container}>
            <h2>区間賞</h2>
            <RecordList records={records} openDetail={null}/>
            <nav>
              <ul>
                <li>
                  <Link to='/Test'>区間別</Link>
                </li>
                <li>
                  <Link to='/TeamResults'>最終結果</Link>
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
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
};

export default SectionalPrize;
