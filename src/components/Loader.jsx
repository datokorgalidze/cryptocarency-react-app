import { Spin } from 'antd';

const Loader = ({text}) => (
 <>
  <div className="loader">
    <Spin />
  
  </div>
  <div style={{ textAlign: 'center'}}>{text && <p >{text}</p>}</div> 
  </> 
);

export default Loader;