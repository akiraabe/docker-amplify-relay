import React from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  openDetail: any | null;
}

export const RecordList: React.FC<Props> = ({ records, openDetail }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Section</TableCell>
            <TableCell>Runner</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Result</TableCell>
            {openDetail !== null && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.section}</TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.team}</TableCell>
              <TableCell>{record.result}</TableCell>
              {openDetail !== null && (
                <TableCell>
                  <IconButton color='primary' onClick={() => openDetail(record)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
