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
        <OwnersList />
        <PolicyList />
      </div>
    );
  }
}


export default AcctInfo;
