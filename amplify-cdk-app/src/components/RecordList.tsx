import React, { useEffect } from 'react';
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
import { EditRecordDialog } from './EditRecordDialog';

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
  setRecords: any;
}

export const RecordList: React.FC<Props> = ({ records, openDetail, setRecords }) => {
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [record, setRecord] = React.useState(null);
  const handleClick = (record: any) => {
    console.log(record);
    setRecord(record);
    setDialogOpened(true);
  };

  useEffect(() => {
    console.log('useEffect was fired');
  }, [record]);

  return (
    <>
      {record !== null && (
        <EditRecordDialog
          open={dialogOpened}
          setOpen={setDialogOpened}
          record={record}
          setRecords={setRecords}
          records={records}
        />
      )}
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
                    <IconButton
                      color='primary'
                      onClick={() => handleClick(record)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
