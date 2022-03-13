import React, { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { createRecord } from '../graphql/mutations';
import { listRecords } from '../graphql/queries';

import { ListRecordsQuery, CreateRecordInput } from '../API';

import awsExports from '../aws-exports';
import { GraphQLResult } from '@aws-amplify/api';
import { TextField } from '@mui/material';
import { RecordList } from '../components/RecordList';
import { Link } from 'react-router-dom';

Amplify.configure(awsExports);

const initialState = {
  raceId: 0,
  name: '',
  discordId: 9999,
  section: 1,
  team: '',
  result: '',
  description: '',
};

const Top: React.VFC = () => {
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
      <TextField
        onChange={(event) => setInput('raceId', event.target.value)}
        value={formState.raceId}
        label='RaceId'
        variant='outlined'
        type='number'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('name', event.target.value)}
        value={formState.name}
        label='Name'
        variant='outlined'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('discordId', event.target.value)}
        value={formState.discordId}
        label='DiscordId'
        variant='outlined'
        type='number'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('section', event.target.value)}
        value={formState.section}
        label='Section'
        variant='outlined'
        type='number'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('team', event.target.value)}
        value={formState.team}
        label='Team'
        variant='outlined'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('result', event.target.value)}
        value={formState.result}
        label='Result'
        variant='outlined'
        margin='dense'
        size='small'
      />
      <TextField
        onChange={(event) => setInput('description', event.target.value)}
        value={formState.description}
        label='Description'
        variant='outlined'
        margin='dense'
        size='small'
      />
      <button style={styles.button} onClick={addRecord}>
        Create Record
      </button>
      <RecordList records={records} />
      <nav>
        <ul>
          <li>
            <Link to="/Test">GraphQL Test</Link>
          </li>
        </ul>
      </nav>
    </div>
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
  record: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  recordName: { fontSize: 20, fontWeight: 'bold' },
  recordItem: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

//export default withAuthenticator(App);
export default Top;
