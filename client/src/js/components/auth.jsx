import React from 'react';
import { Link } from 'react-router';
import GoogleButton from './google-button';


class GoogleAuthorization extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="flex flex-column items-center mw6 center">
        <h2>Welcome</h2>
        <p className="mb4 lh-copy">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
        <GoogleButton />
      </section>
    );
  }
}


export default GoogleAuthorization;
