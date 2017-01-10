import React from 'react';
import ItemsList from './items-list';
import AcctInfo from './acct-info';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main id="content">
        <ItemsList />
        <AcctInfo />
      </main>
    );
  }
}


export default Main;
