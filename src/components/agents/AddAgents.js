import React from 'react';
import AddAgent from '../sections/agent-archive/AddAgent';
import Layout from '../../customComponents/layout/Layout';

const AddAgents = () => {
  return (
    <Layout>
      <div className="container">
        <AddAgent />
      </div>
    </Layout>
  );
};

export default AddAgents;
