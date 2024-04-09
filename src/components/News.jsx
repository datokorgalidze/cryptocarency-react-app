import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';



const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;



const News = ({ simplified }) => {
  
    const { data } = useGetCryptosQuery(100)
    const count = simplified ? 6 : 15; 
    const { data: cryptoNews } = useGetCryptoNewsQuery( count );
  
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    
    
    if( !cryptoNews?.data ) return <Loader/>
   
   
   
   
   


    const filteredCryptoNews = simplified
    ? cryptoNews.data.slice(0, count)
    : selectedCrypto
    ? cryptoNews.data.filter((news) =>
       news.title && news.title.toLowerCase().includes(selectedCrypto.toLowerCase())
      )
    : cryptoNews.data.slice(0, count);

    return (
        <Row gutter={[24,24]}>
             {!simplified && (
                <Col span={24}>
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select a Crypto"
                    optionFilterProp="children"
                    onChange={(value) => setSelectedCrypto(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="Cryptocurency">Cryptocurrency</Option>
                    {data?.data?.coins?.map((currency) => <Option value={currency.name} key={currency.uuid}>
                        {currency.name}
                    </Option>)}
                </Select>
                </Col>
            )}
         {filteredCryptoNews.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                   <a href={news.url}  target="_blank" rel="noreferrer">
                      <div className='news-image-container'>
                         <Title level={4} className='news-title'>
                             {news.title.length > 50 ? `${news.title.substring(0, 50)}...` : news.title}
                         </Title>
                         <img src={news?.thumbnail || demoImage} alt="news" />
                      </div>
                      <p>
                         {news.description.length > 140 ? `${news.description.substring(0, 140)}  ...` :
                         news.description }
                      </p>
                      <div className="provider-container">
                        <div>
                            <Avatar src={news.thumbnail || demoImage} alt="" />
                           
                        </div>
                        <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                    </div>
                   </a>
                </Card>
            </Col>
         ))}
        </Row>
    );
};


export default News;





