import React from 'react';
import { AppButton } from '../components/_ui/AppButton';
import { Thumb } from '../components/Thumb';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
      <div className="triangle-bg">
        <div className="container">
          <div className="container__welcome">
            <Thumb />
            <div className="start">
              <h1 className="start__heading">Who wants to be a millionaire?</h1>
              <Link to="/questions">
                <AppButton type="button" text="Start" />
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
