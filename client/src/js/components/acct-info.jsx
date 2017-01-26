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
      <div>
        <div className="mw6 mw8-ns center">
          <h2 className="pa3">Account Information</h2>
          <div className="flex flex-column flex-row-ns ph3">
            <OwnersList />
            <PolicyList />
          </div>
        </div>
      </div>
    );
  }
}


export default AcctInfo;
