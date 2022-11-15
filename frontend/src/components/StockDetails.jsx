import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetStockDetailsQuery, useGetStockHistoryQuery } from '../services/StockApi';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const StockDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetStockDetailsQuery(coinId);
  const { data: coinHistory } = useGetStockHistoryQuery({ coinId, timeperiod });
  const StockDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${StockDetails?.price && millify(StockDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: StockDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${StockDetails?.volume && millify(StockDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${StockDetails?.marketCap && millify(StockDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${StockDetails?.allTimeHigh?.price && millify(StockDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: StockDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: StockDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: StockDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${StockDetails?.supply?.total && millify(StockDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${StockDetails?.supply?.circulating && millify(StockDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>{StockDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(StockDetails?.price)} coinName={StockDetails?.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{StockDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {StockDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {StockDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {StockDetails.name}?</Title>
          {HTMLReactParser(StockDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{StockDetails.name} Links</Title>
          {StockDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default StockDetails;
