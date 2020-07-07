import React, { useState } from 'react';
import './App.css';
import { Tabs } from 'antd';
import 'antd/dist/antd.css'; 
import InputTab from './components/InputTab';
import OutTab from './components/OutTab';

const { TabPane } = Tabs;

function App() {

  const [activeTab, setActiveTab] = useState('in');

  const [appData, setAppData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    country: '',
    city: '',
    csv: ''
  });

  const handleSubmit = (data) => {
    setAppData(data);
    setActiveTab('out');
  }

  return (
    <main className="app">
      <Tabs defaultActiveKey="in" activeKey={activeTab} onTabClick={() => setActiveTab('in')}>
      <TabPane tab="Input" key="in">
        <InputTab onSubmit={(data) => handleSubmit(data)}/>
      </TabPane>
      <TabPane tab="Output" key="out">
        <OutTab appData={appData}/>
      </TabPane>
    </Tabs>
  </main>
  );
}

export default App;
