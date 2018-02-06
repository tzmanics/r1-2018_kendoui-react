import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

import nutrition from './nutrition.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nutrition: this.getNutrition([]),
      sort: [],
      allowUnsort: true
    };
    this.sortChange = this.sortChange.bind(this);
  }

  sortChange = (event) => {
    this.setState({
      nutrition: this.getNutrition(event.sort),
      sort: event.sort
    });
  }

  getNutrition = (sort) => orderBy(nutrition, sort);

  render() {
    return (
      <div className="App">
        <h1> Healthy Things! </h1>
        <Grid
          style={{ maxHeight: '500px' }}
          data={this.state.nutrition}
          sortable={{
            allowUnsort: this.state.allowUnsort,
            mode: 'multiple'
          }}
          sort={this.state.sort}
          sortChange={this.sortChange}>
          <Column field='Description' title='Food' />
          <Column field='Measure' title='Amount' />
          <Column field='Protein(g)Per Measure' title='Protein' />
          <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
          <Column field='Sugars, total(g)Per Measure' title='Sugars' />
        </Grid>
      </div>
    );
  }
}

export default App;
