import React from 'react';
import Tilt from 'react-tilt';
import './index.css';

const Logo = () => (
  <div className='ma4 mt0'>
    <Tilt
      className='Tilt br2 shadow-2'
      options={{ max: 55 }}
      style={{ width: 150, height: 150 }}
    >
      <div className='Tile-inner pa3'>
        <img
          src='https://image.flaticon.com/icons/png/512/883/883039.png'
          alt='logo'
        />
      </div>
    </Tilt>
  </div>
);

export default Logo;
