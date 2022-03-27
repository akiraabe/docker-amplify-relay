import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import React from 'react';
import { useState } from 'react';
import { CreateRecordInput } from '../API';
import { createRecord } from '../graphql/mutations';

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  records: any,
  setRecords: any,
}

export const InputRecordDialog: React.FC<Props> = ({
  open,
  setOpen,
  records,
  setRecords,
}) => {
  const initialState = {
    raceId: 0,
    name: '',
    discordId: 9999,
    section: 0,
    team: '',
    result: '',
    description: '',
  };

  const [formState, setFormState] = useState(initialState);
  const setInput = (key: string, value: string) => {
    console.log(value);
    setFormState({ ...formState, [key]: value });
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
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Input a record</DialogTitle>
      <DialogContent>
        <DialogContentText>Input a record below.</DialogContentText>
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
          type='number'
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
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={addRecord}>Create Record</Button>
      </DialogActions>
    </Dialog>
  );
};
