import React from 'react';
import ItemsList from './items-list';
import OwnersList from './owners-list';
import PoliciesList from './policies-list';
import CategoriesList from './categories-list';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main id="content">
        <CategoriesList />
        <ItemsList />
        <OwnersList />
        <PoliciesList />
      </main>
    );
  }
}


export default Main;
