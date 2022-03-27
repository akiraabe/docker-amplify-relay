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

export type Result = {
   rank: number;
   team: string;
   result: string;
   resultInt: number;
 };

interface Props {
  results: Result[];
}

export const ResultList: React.FC<Props> = ({ results }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>順位</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result: Result, index: number) => (
            <TableRow key={result.rank}>
              <TableCell>{result.rank}</TableCell>
              <TableCell>{result.team}</TableCell>
              <TableCell>{result.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

