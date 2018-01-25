import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import './App.css';
import '@progress/kendo-theme-material';

class App extends Component {
  ratings = ['Rad', 'Awesome', 'Stellar', 'Interstellar 👽'];

  render() {
    return (
      <div className="App">
        <DropDownList data={this.ratings} />
      </div>
    );
  }
}

export default App;
