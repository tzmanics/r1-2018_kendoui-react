import React, { Component } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

import nutrition from './nutrition.json';

class App extends Component {
  constructor(props) {
    super(props)
    const initialFilter = {
      logic: 'and',
      filters: [{ field: 'Description', operator: 'contains', value: 'Apple' }]
    };
    
    this.state = {
      data: this.getnutrition(initialFilter),
      filter: initialFilter,
      interationValue: null,
      goals: []
    };
    this.filterChange = this.filterChange.bind(this);
  }

  filterChange = (event) => {
    this.setState({
      data: this.getnutrition(event.filter),
      filter: event.filter
    });
  }

  getnutrition = (filter) => filterBy(nutrition, filter);

  handleGoalChange = (idx) => (event) => {
    const newGoals = this.state.goals.map((goal, sidx) => {
      if (idx !== sidx) return goal;
      return { ...goal };
    });

    this.setState({ goals: newGoals });
  }

  handleSubmit = (event) => {
    const { goals } = this.state;
  }

  handleAddGoal = () => {
    this.setState({ goals: this.state.goals.concat([{ goal: ''}])});
  }
      
  handleRemoveGoal = (idx) => () => {
    this.setState({
      goals: this.state.goals.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    return (
      <div className='App'>
        <h1> Healthy Things! </h1>
        <Grid
          style={{ maxHeight: '500px' }}
          data={this.state.data}
          filterable={true}
          filter={this.state.filter}
          filterChange={this.filterChange}>
          <Column field='Description' title='Food' />
          <Column field='Measure' title='Amount' />
          <Column field='Protein(g)Per Measure' title='Protein' />
          <Column field='Carbohydrate, by difference(g)Per Measure' title='Carbs' />
          <Column field='Sugars, total(g)Per Measure' title='Sugars' />
        </Grid>
        <div clasName='iteration-area'>
          <h2> Healthy Habits </h2>
          <div className='goal-list'>
            <h3> Goals </h3>
          </div>
          <div className='addIterationGoal'>
            <form onSubmit={this.handleSubmit}>
              {this.state.goals.map((goal, idx) => (
                <div className='goals'>
                  <input
                    type='text'
                    placeholder={`Goal #${idx +1} name`}
                    value={goal.name}
                  />
                </div>
              ))}
              <button type='button' onClick={this.handleAddGoal}
                className='add'>Add Goal</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
