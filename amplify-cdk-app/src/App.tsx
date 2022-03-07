import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { createRecord } from './graphql/mutations';
import { listRecords } from './graphql/queries';

import { ListRecordsQuery, CreateRecordInput } from './API';

import awsExports from './aws-exports';
import { GraphQLResult } from '@aws-amplify/api';
Amplify.configure(awsExports);

const initialState = {
  raceId: undefined, // place holderが出ないので仕方なくundefinedにしました。
  name: '',
  discordId: undefined,
  section: undefined,
  team: '',
  result: '',
  description: '',
};

const App: React.VFC = () => {
  const [formState, setFormState] = useState(initialState);
  const [records, setRecords] = useState<CreateRecordInput[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const setInput = (key: string, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const fetchRecords = async () => {
    try {
      const recordData = (await API.graphql(
        graphqlOperation(listRecords)
      )) as GraphQLResult<ListRecordsQuery>;
      if (recordData.data?.listRecords?.items) {
        const records = recordData.data.listRecords
          .items as CreateRecordInput[];
        setRecords(records);
      }
    } catch (err) {
      console.log('error fetching records');
    }
  };

  const addRecord = async () => {
    try {
      if (
        !formState.name ||
        !formState.description ||
        !formState.team ||
        !formState.discordId
      )
        return;
      const record: CreateRecordInput = { ...formState };
      setRecords([...records, record]);
      setFormState(initialState);
      (await API.graphql(
        graphqlOperation(createRecord, { input: record })
      )) as GraphQLResult<CreateRecordInput>;
    } catch (err) {
      console.log('error creating record:', err);
    }
  };
  return (
    <div style={styles.container}>
      <h2>Amplify Records</h2>
      <input
        onChange={(event) => setInput('raceId', event.target.value)}
        style={styles.input}
        value={formState.raceId}
        placeholder='RaceId'
      />
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder='Name'
      />
      <input
        onChange={(event) => setInput('discordId', event.target.value)}
        style={styles.input}
        value={formState.discordId}
        placeholder='DiscordId'
      />
      <input
        onChange={(event) => setInput('section', event.target.value)}
        style={styles.input}
        value={formState.section}
        placeholder='Section'
      /> 
      <input
        onChange={(event) => setInput('team', event.target.value)}
        style={styles.input}
        value={formState.team}
        placeholder='Team'
      />
      <input
        onChange={(event) => setInput('result', event.target.value)}
        style={styles.input}
        value={formState.result}
        placeholder='Result'
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder='Description'
      />
      <button style={styles.button} onClick={addRecord}>
        Create Record
      </button>
      {records.map((record, index) => (
        <div key={record.id ? record.id : index} style={styles.record}>
          <p style={styles.recordName}>{record.name}</p>
          <p style={styles.recordDescription}>{record.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    width: 300,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  record: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  recordName: { fontSize: 20, fontWeight: 'bold' },
  recordDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

//export default withAuthenticator(App);
export default App;
