import React, { Suspense, lazy, useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import sendIcon from '../../../assets/settings/send.png';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import {
  getAllConversationMessages,
  sendMessage,
} from '../../../api/firebaseQueries';
const Messages = lazy(() => import('./Messages'));

const useStyles = makeStyles(() => ({
  scroll: {
    height: 'calc(100vh - 230px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    height: 'calc(100vh - 230px)',
  },
  upper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottom: '1px solid #D7DFE8',
  },
  upperLeftMain: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    objectFit: 'cover',
    margin: '0 10px',
    cursor: 'pointer',
  },
  username: {
    fontFamily: 'bold',
    fontSize: 18,
    color: '#292929',
  },
  userEmail: {
    fontFamily: 'light',
    fontSize: 16,
    color: '#89949F',
  },
  upperRightMain: {
    display: 'flex',
  },
  icons: {
    cursor: 'pointer',
    margin: '0 5px',
  },
  lower: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTop: '1px solid #D7DFE8',
  },
  inputMain: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#F6F8FA',
    borderRadius: 10,
    padding: '0 10px',
  },
  input: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 35,
    border: 'none',
    fontFamily: 'medium',
    fontSize: 16,
    '&:focus': {
      outline: 'none',
    },
    color: '#9DAFBD',
    backgroundColor: '#F6F8FA',
    // borderRadius: 10,
    // padding: '0 10px',
  },
}));

const UserChat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState('');

  const { selectedConversation, conversationMessages } = useSelector(
    (state) => state.chat
  );
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("logged_in"));
  }, []);

  useEffect(async () => {
    const messageListener = getAllConversationMessages(
      dispatch,
      selectedConversation?.id
    );
    return () => {
      messageListener();
    };
    // eslint-disable-next-line
  }, [selectedConversation]);

  const getSenderInfo = (users, prop) => {
    return users?.filter(
      (elem) => elem?.id !== currentUser?.firebaseDocId
    )[0]?.[prop];
  };
  const handleSendMessage = () => {
    sendMessage({
      sender: currentUser?.firebaseDocId,
      receiver: getSenderInfo(selectedConversation?.users, 'id'),
      text: chatMessage,
      conversationId: selectedConversation?.id,
    });
    setChatMessage('');
  };
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.upper}>
          <div className={classes.upperLeftMain}>
            <Avatar
              src={getSenderInfo(selectedConversation?.users, 'photo')}
              className={classes.profilePic}
            />

            <div>
              <div className={classes.username}>
                {getSenderInfo(selectedConversation?.users, 'name')}
              </div>
              <div className={classes.userEmail}>
                {getSenderInfo(selectedConversation?.users, 'email')}
              </div>
            </div>
          </div>

        </div>
        {conversationMessages?.length > 0 && (
          <Suspense fallback={'Loading'}>
            {selectedConversation && <Messages />}
          </Suspense>
        )}

        <div className={classes.lower}>
          <div className={classes.inputMain}>
            <input
              type="text"
              className={classes.input}
              placeholder={'Type'}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyUp={(key) => key?.code === 'Enter' && handleSendMessage()}
            />

            <IconButton
              sx={{ p: 0, m: 0 }}
              onClick={handleSendMessage}
              disabled={!chatMessage?.length}
            >
              <img className={classes.icons} alt="send" src={sendIcon} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
