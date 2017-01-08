import React from 'react';
import Header from './header';
import CategoriesList from './categories-list';
import Main from './main';
import Footer from './footer';


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
