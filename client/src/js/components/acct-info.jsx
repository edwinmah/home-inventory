import React from 'react';
import OwnersList from './owners-list';
import PolicyList from './policies-list';


class AcctInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="mw5 mw8-ns center pa4 ph3-ns">
          <h2>Account Information</h2>
          <OwnersList />
          <PolicyList />
        </div>
      </div>
    );
  }
}


export default AcctInfo;
