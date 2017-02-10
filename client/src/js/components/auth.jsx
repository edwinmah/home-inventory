import React from 'react';
import { Link } from 'react-router';
import GoogleButton from './google-button';


class GoogleAuthorization extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="mw6 mw8-ns center">
        <header className="mb4 bt bb b--black-20">
          <h2 className="mw6 center fw3 f4 tracked">Hello and welcome...</h2>
        </header>
        <div className="flex flex-column items-center">
          <p className="w-100 w-50-ns mb4 lh-copy">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
          <GoogleButton />
        </div>
      </article>
    );
  }
}


export default GoogleAuthorization;
