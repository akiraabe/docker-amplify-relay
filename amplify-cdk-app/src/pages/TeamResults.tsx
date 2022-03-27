import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { recordByRaceId } from '../graphql/queries';

import { CreateRecordInput, RecordByRaceIdQuery } from '../API';
import { GraphQLResult } from '@aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Header } from '../components/Header';
import { Result, ResultList } from '../components/ResultList';

const TeamResults = () => {
  const [results, setResults] = useState<Result[]>([]);

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
        
        // business logic
        const teams = extractTeamArray(records);
        const results = groupByTeamResult(teams, records);
        const rankedResults = rankResults(results);
        setResults(rankedResults);
      }
    } catch (err) {
      console.log('error fetching records');
    }
  };

  // teamをarrayから抽出する
  const extractTeamArray = (items : any[]) => {
    items.sort((a:  { team: string; }, b: { team: string}) => {
      if (a.team > b.team) {
        return 1;
      } else {
        return -1;
      }
    });
    const teams: string[] = [];
    items.forEach((item: any) => {
      if (teams.includes(item.team)) {
        // no-ope
      } else {
        teams.push(item.team);
      }
    });
    return teams;
  };

  // team毎に、合計タイムを算出する
  const groupByTeamResult = (teams:string[], items: any[]) => {
    const results:Result[] = [];
    teams.forEach((team) => {
      const Result = {
        rank: 0,
        team: "",
        result: "",
        resultInt: 0,
        toInt: function () {
          //00:25:01
          this.resultInt +=
            Number(this.result.substring(0, 2)) * 3600 +
            Number(this.result.substring(3, 5)) * 60 +
            Number(this.result.substring(6, 8));
        },
        toString: function () {
          const hour = Math.floor(this.resultInt / 3600);
          const hourRemain = this.resultInt % 3600;
          const minute = Math.floor(hourRemain / 60);
          const second = hourRemain % 60;
          this.result = "" + hour + ":" + minute + ":" + second;
        },
      };
      let resultRow = Object.create(Result);
      items
        .filter((item) => item.team === team)
        .forEach((item) => {
          resultRow.team = item.team;
          resultRow.result = item.result;
          resultRow.toInt();
          // console.log(resultRow.resultInt);
          resultRow.toString();
        });
      // console.log('push here');
      // console.log(resultRow);
      results.push(resultRow);
    });
    return results;
  };

  // 順位づけを行う
  const rankResults = (results: Result[]) => {
    results.sort((a: {resultInt: number} , b: { resultInt: number} ) => {
      if (a.resultInt > b.resultInt) {
        return 1;
      } else {
        return -1;
      }
    });
    let i = 0;
    results.forEach((result) => {
      result.rank = ++i;
    });
    return results;
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Header />
          <div style={styles.container}>
            <h2>最終結果</h2>
            <ResultList results={results} />
            <nav>
              <ul>
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
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
};

export default TeamResults;
