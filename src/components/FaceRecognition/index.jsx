import React from 'react';
import './index.css';

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={imageUrl} alt='' width={500} height='auto' />
        <div
          className='center bounding-box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
