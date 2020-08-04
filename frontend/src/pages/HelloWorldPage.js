import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import HelloWorldContainer from '../containers/HelloWorldContainer';

import { getGreeting, getGreetings } from '../features/appSlice';

export default function HelloWorldPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGreetings());
    dispatch(getGreeting());
  }, []);

  return (
    <HelloWorldContainer />
  );
}
