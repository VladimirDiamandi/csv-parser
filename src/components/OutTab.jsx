import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Input } from 'antd';
import { Typography } from 'antd';
import { toTable, toGraph } from '../utils/csvUtil';
import { Chart } from 'react-charts';
import PropTypes from 'prop-types';

const { Text } = Typography;
const { Search } = Input;

function OutTab({appData}) {

  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const json = appData.csv;
    const table = toTable(json);
    const graph = toGraph(json);
    
    setDataSource(table.data);
    setColumns(table.columns);
    setGraphData(graph);
  }, [appData.csv]);

  const axes = [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ];

  const handleSearch = (value) => {
    if (!value.trim().length) {
      const table = toTable(appData.csv);
      setDataSource(table.data);
      return;
    }

    const title = columns[0].title;
    
    const data = dataSource.filter(item => item[title].toLowerCase().includes(value.toLowerCase()));
    setDataSource(data);
  }

  return (
    <Card>
      <Row gutter={8}>
        <Col span={10} offset={10}>
          <Text>{appData.name}, {appData.gender}, {appData.age}</Text>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={10}>
          <Text>{appData.date}</Text>
        </Col>
        <Col span={10}>
          <Text>{appData.city}, {appData.country}, {appData.email}</Text>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={10}>
        <Search
          placeholder="Filter..."
          onSearch={handleSearch}
        />
          <Table dataSource={dataSource} columns={columns} />;
        </Col>
        <Col span={8}>
        <div
          style={{
            width: '400px',
            height: '600px',
          }}
        >
          <Chart data={graphData} axes={axes} series={{type: 'bar'}}/>
        </div>
        </Col>
      </Row>
    </Card>
  );
};

OutTab.propTypes = {
  appData: PropTypes.object.isRequired,
};

export default OutTab;