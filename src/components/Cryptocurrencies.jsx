import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/cryptoApi';



 const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 12 : 100 
    const {data, isFetching} = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState(data?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('');

  
   
    useEffect(() => {
        setCryptos(data?.data?.coins);
    
        const filteredData = data?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
    
        setCryptos(filteredData);
      }, [data, searchTerm]);

    if(isFetching) return <Loader/>

    return(
       <> 
          {!simplified && (
              <div className="search-crypto">
              <Input
                placeholder="Search Cryptocurrency"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
              </div>
          )}
      
         <Row gutter={[32,32]} className='crypto-card-container'>
            {cryptos?.map((crypto) => (
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
                  <Link to={`/crypto/${crypto.uuid}`}>
                     <Card 
                     title = {`${crypto.rank}. ${crypto.name}`}
                     extra = {<img className='crypto-image' alt='crypto' src= {crypto.iconUrl 
                     }/>}
                     hoverable
                     >
                     <p>Price: {millify(crypto.price)}</p>
                     <p>Market Cap: {millify(crypto.marketCap)}</p>
                     <p>Daily Change: {millify(crypto.change)}%</p>
                     </Card>
                  </Link>
                </Col>
            ))}
         </Row>
         
       </>
    )
 }


 export default Cryptocurrencies;