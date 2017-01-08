import React from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';
import CategoriesList from './categories-list';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <CategoriesList />
        <Main />
        <Footer />
      </div>
    );
  }
}


export default App;
