import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetstocksQuery } from '../services/StockApi';
import Loader from './Loader';

const stockcurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: stocksList, isFetching } = useGetstocksQuery(count);
  const [stocks, setstocks] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setstocks(stocksList?.data?.coins);

    const filteredData = stocksList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setstocks(filteredData);
  }, [stocksList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-stock">
          <Input
            placeholder="Search stockcurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="stock-card-container">
        {stocks?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="stock-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/stock/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="stock-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default stockcurrencies;
