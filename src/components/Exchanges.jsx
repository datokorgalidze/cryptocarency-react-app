import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';


import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  
 
  if (isFetching || !exchangesList) return <Loader text= "Unfortunately This API has become paid" />;

 // This API has become paid
  
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={10}></Col>
      </Row>
      <Row>
        {exchangesList.map((exchange,i) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={i}
                showArrow={false}
                header={(
                  <Row key={i}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={10}>{exchange.coinrankingUrl.length > 33 ?
                     exchange.coinrankingUrl.substring(0, 33) : exchange.coinrankingUrl}
                    </Col>
                  </Row>
                  )}
              >
                <a href={exchange.coinrankingUrl} target='_blank' rel="noreferrer">{exchange.coinrankingUrl}</a>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;