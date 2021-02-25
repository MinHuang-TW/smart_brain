import React, { useState } from 'react';

const Register = ({ loadUser, onRouteChange }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target: input }) => {
    const data = { ...userData };
    data[input.name] = input.value;
    setUserData(data);
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          loadUser(user);
          onRouteChange('home');
        }
      });
  };

  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Register</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>
                Name
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='text'
                name='name'
                id='name'
                onChange={handleChange}
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                id='password'
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={handleSubmit}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='register'
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
