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
import { DeleteRecordInput, UpdateRecordInput } from '../API';
import { deleteRecord, updateRecord } from '../graphql/mutations';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record: any;
  setRecords: any;
  records: any;
}

export const EditRecordDialog: React.FC<Props> = ({ open, setOpen, record, setRecords, records }) => {

  const initialState = {
    id: record.id,
    raceId: record.raceId,
    name: record.name,
    discordId: record.discordId,
    section: record.section,
    team: record.team,
    result: record.result,
    description: record.description,
  };

  const [formState, setFormState] = useState(initialState);
  const setInput = (key: string, value: string) => {
    console.log(value);
    setFormState({ ...formState, [key]: value });
  };

  const editRecord = async () => {
    try {
      if (
        !formState.name ||
        !formState.description ||
        !formState.team ||
        !formState.discordId
      )
        return;
      const record: UpdateRecordInput = { ...formState };
      //TODO: AddではなくReplaceする。
      setRecords([...records, record]);
      setFormState(initialState);
      console.log('editRecord');
      console.log(record);
      (await API.graphql(
        graphqlOperation(updateRecord, { input: record })
      )) as GraphQLResult<UpdateRecordInput>;
    } catch (err) {
      console.log('error updating record:', err);
    }
    setOpen(false);
  };

  const removeRecord = async () => {
    try {
      //TODO: AddではなくReplaceする。
      //setRecords([...records, record]);
      setFormState(initialState);
      console.log('deleteRecord');
      console.log(record);
      (await API.graphql(
        graphqlOperation(deleteRecord, { input: { id: record.id} })
      )) as GraphQLResult<DeleteRecordInput>;
    } catch (err) {
      console.log('error deleting record:', err);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit a record</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit a record below.</DialogContentText>
        <TextField
          onChange={(event) => setInput('raceId', event.target.value)}
          autoFocus
          margin='dense'
          id='raceId'
          label='RaceId'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={record.raceId}
        />
        <TextField
          onChange={(event) => setInput('name', event.target.value)}
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={record.name}
        />
        <TextField
          onChange={(event) => setInput('discordId', event.target.value)}
          margin='dense'
          id='discordId'
          label='DiscordId'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={record.discordId}
        />
        <TextField
          onChange={(event) => setInput('section', event.target.value)}
          margin='dense'
          id='section'
          label='Section'
          type='number'
          fullWidth
          variant='standard'
          defaultValue={record.section}
        />
        <TextField
          onChange={(event) => setInput('team', event.target.value)}
          margin='dense'
          id='team'
          label='Team'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={record.team}
        />
        <TextField
          onChange={(event) => setInput('result', event.target.value)}
          margin='dense'
          id='result'
          label='Result'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={record.result}
        />
        <TextField
          onChange={(event) => setInput('description', event.target.value)}
          margin='dense'
          id='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={record.description}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            console.log('Cancel button was pressed!!');
            console.log({ record });
          }}
        >
          Cancel
        </Button>
        <Button onClick={editRecord}>Edit Record</Button>
        <Button onClick={removeRecord}>Remove Record</Button>
      </DialogActions>
    </Dialog>
  );
};
