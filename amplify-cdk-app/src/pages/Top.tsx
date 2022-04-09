import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listRecords } from '../graphql/queries';

import { ListRecordsQuery, CreateRecordInput } from '../API';

import awsExports from '../aws-exports';
import { GraphQLResult } from '@aws-amplify/api';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RecordList } from '../components/RecordList';
import { Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Header } from '../components/Header';
import { InputRecordDialog } from '../components/InputRecordDialog';

Amplify.configure(awsExports);

const Top: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [records, setRecords] = useState<CreateRecordInput[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

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

  const openDetail = (record: CreateRecordInput) => {
    console.log('openDetail is pressed');
    console.log(record);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <div style={styles.container}>
            <div style={styles.boxContainer}>
              <h2>結果一覧</h2>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab size='small' color='primary' aria-label='add'>
                  <AddIcon onClick={handleClickOpen} />
                </Fab>
              </Box>
            </div>
            <InputRecordDialog
              open={open}
              setOpen={setOpen}
              records={records}
              setRecords={setRecords}
            />
            {/* とりあえずレコードを全件表示 */}
            <RecordList records={records} openDetail={openDetail} setRecords={setRecords}/>
            <nav>
              <ul>
                <li>
                  <Link to='/Test'>区間別</Link>
                </li>
              </ul>
            </nav>
            <button onClick={signOut}>Sign out</button>
          </div>
        </Box>
      )}
    </Authenticator>
  );
};

const styles: {
  [key: string]: React.CSSProperties;
} = {
  container: {
    width: 450,
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
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

// export default withAuthenticator(Top);
export default Top;
