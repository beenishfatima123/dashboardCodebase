import {
  collection,
  query,
  onSnapshot,
  addDoc,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  setAllConversations,
  setConversationMessages,
} from '../features/chatSlice';
import { db } from '../firebase/index';

export const getAllFirebaseUsers = (setData, existingUsers) => {
  const firebaseQuery = query(collection(db, 'users'));
  const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      if (!existingUsers?.includes(doc?.id))
        data.push({ ...doc.data(), id: doc?.id });
    });

    setData(data);
  });
  return unsubscribe;
};
export const startConversation = async (data) => {
  await addDoc(collection(db, 'conversations'), {
    users: [
      {
        name: data?.receiver?.name,
        photo: data?.receiver?.photo || '',
        email: data?.receiver?.email,
        id: data?.receiver?.id,
      },
      {
        name: `${data?.user?.first_name} ${data?.user?.last_name}`,
        photo: data?.user?.photo || '',
        email: data?.user?.firebaseDocId,
        id: data?.user?.firebaseDocId,
      },
    ],
    userIds: [data?.receiver?.id, data?.user?.firebaseDocId],
    lastMessage: '',
    lastMessageRead: false,
    lastMessageTime: serverTimestamp(),
  });
};
export const getAllConversations = (dispatch, user) => {
  // console.log({ user });
  const firebaseQuery = query(
    collection(db, 'conversations'),
    where('userIds', 'array-contains', user)
  );
  const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc?.id });
    });
    dispatch(setAllConversations(data));
  });
  return unsubscribe;
};
export const getAllConversationMessages = async (dispatch, conversationId) => {
  // console.log({ conversationId });
  // const conversationRef = doc(db, 'conversations', conversationId);
  // await updateDoc(conversationRef, {
  //   lastMessage: "",
  //   lastMessageRead: true,
  // });
  try {
    const firebaseQuery = query(
      collection(db, 'messages'),
      where('conversation', '==', conversationId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(
      firebaseQuery,
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc?.id });
        });
        dispatch(setConversationMessages(data));
      },
      (error) => {
        console.log({ error });
      }
    );
    return unsubscribe;
  } catch (error) {
    console.log({ error });
    return () => { }
  }
};
export const sendMessage = async (data) => {
  // console.log({ data });
  await addDoc(collection(db, 'messages'), {
    sender: data?.sender,
    receiver: data?.receiver,
    message: data?.text,
    createdAt: serverTimestamp(),
    read: false,
    conversation: data?.conversationId,
  });
  const conversationRef = doc(db, 'conversations', data?.conversationId);
  await updateDoc(conversationRef, {
    lastMessage: data?.text,
    lastMessageTime: serverTimestamp(),
    lastMessageRead: false,
    lastMessageSender: data?.sender,
  });
};

export const getUserStatus = async (statusState) => {
  const firebaseQuery = query(collection(db, 'users'));
  const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc?.id, status: doc.data()?.isOnline });
    });
    statusState(data);
  });
  return unsubscribe;
};
