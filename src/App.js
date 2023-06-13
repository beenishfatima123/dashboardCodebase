import React from 'react';
import Routes from './routes/Routes';
import { store, persistor } from './features/store';
import { Provider } from 'react-redux';
import AuthProvider from './context/auth';
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </>
  );
};

export default App;
