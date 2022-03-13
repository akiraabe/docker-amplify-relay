import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CreateRecordInput } from '../API';

// type Record = {
//   id?: string;
//   section: number;
//   name: string;
//   team: string;
//   result: string;
// };

interface Props {
  records: CreateRecordInput[];
}

export const RecordList: React.FC<Props> = ({ records }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Section</TableCell>
            <TableCell>Runner</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.section}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.team}</TableCell>
              <TableCell>{record.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
