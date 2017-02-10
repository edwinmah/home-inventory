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
          <div className="w-100 w-50-ns mb4 lh-copy">
            <p>Use this app to keep track of the items that you own. Your home inventory can serve as documentation of asset values for insurance coverage and claims and for charitable contributions. Alternatively, use the app as a wishlist of items that you <em>want</em> to purchase or receive as a gift. Or if you&rsquo;re a follower of the <a href="http://www.choosingvoluntarysimplicity.com/" className="dark-blue hover-navy link">voluntary simplicity lifestyle</a>, use the app to become more aware of <em>how little</em> you own and the future purchases you want to avoid. Enjoy.</p>
          </div>
          <GoogleButton />
        </div>
      </article>
    );
  }
}


export default GoogleAuthorization;
