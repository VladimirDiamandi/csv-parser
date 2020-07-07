import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Select, Upload, Button, DatePicker } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import { textToJson } from '../utils/csvUtil';
import PropTypes from 'prop-types';

const { Title } = Typography;
const { TextArea } = Input;

function InputTab({onSubmit}) {

  const AgeOptionsList = () => {
    let items = [];
    for (let age = 0; age <= 120; age++) {
      items.push(<Select.Option value={age} key={age}>{age} y.o.</Select.Option>)
    }
    return items;
  }

  const [currentCountry, setCountry] = useState('Usa');
  const [csvText, setCsvText] = useState('');
  const [fileName, setFileName] = useState('');

  const cities = {
    Usa: [
      "New York City",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose"
    ],
    Canada: [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Niagara Falls",
      "Victoria",
      "Halifax",
      "Quebec City",
      "Calgary",
    ]
  }

  const CitiesList = () => {
    return cities[currentCountry].map(city => <Select.Option value={city} key={city}>{city}</Select.Option>);
  }

  const handleUpload = (data) => {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.onload = function(e) { setCsvText(e.target.result) };
    reader.readAsText(file);
    setFileName(file.name);
  }

  const handleContinue = (values) => {
    values.date = moment(values.date).format("YYYY-MM-DD");
    values.csv = textToJson(csvText);
    onSubmit(values);
  }

  return (
    <Card>
      <Title level={4}>User:</Title>
      <Form onFinish={handleContinue}>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input placeholder="Name"/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
              <Select placeholder="Gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="age" rules={[{ required: true, message: 'Please select your age!' }]}>
              <Select placeholder="Age">
                {AgeOptionsList()}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
        <Col span={16}>
            <Form.Item name="email"  rules={[{ required: true, message: 'Please enter your email!' }]}>
              <Input placeholder="Email"/>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="country"  rules={[{ required: true, message: 'Please select your country!' }]}>
              <Select placeholder="Country" onChange={(value) => setCountry(value)}>
                <Select.Option value="Usa">USA</Select.Option>
                <Select.Option value="Canada">Canada</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="city" rules={[{ required: true, message: 'Please select your city!' }]}>
              <Select placeholder="City">
                {CitiesList()}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Title level={4}>Data:</Title>
        <Row gutter={8}>
          <Col span={16}>
            { fileName || 'Upload CSV file...'}
          </Col>
          <Col span={4}>
            <Upload showUploadList={false} onChange={handleUpload} multiple={false} fileList={[]}>
              <Button>
                Upload
              </Button>
            </Upload>
          </Col>
          <Col span={4}>
            <Form.Item name="date" rules={[{ required: true, message: 'Please select date!' }]}>
              <DatePicker format="YYYY-MM-DD"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TextArea placeholder="Input CSV data" value={csvText} onChange={e => setCsvText(e.target.value)} rows={10}/>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={2} offset={20}>
            <Button htmlType="submit">Continue</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

InputTab.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
  
export default InputTab;
  