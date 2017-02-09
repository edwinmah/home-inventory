import React from 'react';
import { connect } from 'react-redux';
import OwnersList from './owners-list';
import PolicyList from './policies-list';


class AcctInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="mw6 mw8-ns center ph3 ph0-l">
        <header className="mb4 bt bb b--black-20">
          <h2 className="ph3">Account Information</h2>
        </header>
        <div className="flex flex-column flex-row-ns ph3">
          <OwnersList />
          <PolicyList />
        </div>
      </section>
    );
  }
}


export default AcctInfo;
