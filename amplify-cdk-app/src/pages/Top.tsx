import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { createRecord } from '../graphql/mutations';
import { listRecords } from '../graphql/queries';

import { ListRecordsQuery, CreateRecordInput } from '../API';

import awsExports from '../aws-exports';
import { GraphQLResult } from '@aws-amplify/api';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RecordList } from '../components/RecordList';
import { Link } from 'react-router-dom';

Amplify.configure(awsExports);

const initialState = {
  raceId: 0,
  name: '',
  discordId: 9999,
  section: 0,
  team: '',
  result: '',
  description: '',
};

const Top: React.VFC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setOpen(false);
  };
  return (
    <div style={styles.container}>
      <div>
        <div style={styles.boxContainer}>
          <h2>Amplify Records</h2>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab size="small" color='primary' aria-label='add'>
              <AddIcon onClick={handleClickOpen} />
            </Fab>
          </Box>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              onChange={(event) => setInput('raceId', event.target.value)}
              autoFocus
              margin='dense'
              id='raceId'
              label='RaceId'
              type='number'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('name', event.target.value)}
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('discordId', event.target.value)}
              margin='dense'
              id='discordId'
              label='DiscordId'
              type='number'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('section', event.target.value)}
              margin='dense'
              id='section'
              label='Section'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('team', event.target.value)}
              margin='dense'
              id='team'
              label='Team'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('result', event.target.value)}
              margin='dense'
              id='result'
              label='Result'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              onChange={(event) => setInput('description', event.target.value)}
              margin='dense'
              id='description'
              label='Description'
              type='text'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addRecord}>Create Record</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* とりあえずレコードを全件表示 */}
      <RecordList records={records} />
      <nav>
        <ul>
          <li>
            <Link to='/Test'>GraphQL Test</Link>
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
  boxContainer : {
    display: 'flex',
    justifyContent: 'space-between',
  }
};

//export default withAuthenticator(App);
export default Top;
