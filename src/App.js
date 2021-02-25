import { useState } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Signin from './components/Signin';
import Register from './components/Register';
import FaceRecognition from './components/FaceRecognition';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: '65e9f3c02c284459abfdd25ee662cf5b',
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setImageUrl(input);

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((error) => console.log(error));
  };

  const handleRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={handleRouteChange} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={handleChange}
            onButtonSubmit={handleSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'signin' ? (
        <Signin onRouteChange={handleRouteChange} />
      ) : (
        <Register onRouteChange={handleRouteChange} />
      )}
    </div>
  );
};

export default App;
