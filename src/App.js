import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

import nutrition from './nutrition.json';

class App extends Component {

  constructor(props) {
    super(props)
    const initialFilter = {
      logic: 'and',
      filters: [{
        field: 'Description',
        operator: 'contains',
        value: 'Apple'
      }],
    };

    this.state = {
      data: this.getnutrition(initialFilter),
      filter: initialFilter,
      goalId: 0,
      goalName: '',
      goalIteration: null,
      goals: [],
      goalOptions: [
        'Cup of Water',
        '10 Minutes of Meditation',
        'Hour of Code',
        '10 Pushups',
        'Hour of Articles',
        'Hour of Reading'
      ]
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

  handleNameChange = (event) => {
    this.setState({ goalName: event.target.value });
  }

  handleIterationChange = (event) => {
    this.setState({ goalIteration: event.target.value });
  }

  handleAddGoal = (event) => {
    this.setState({
      goals: this.state.goals.concat([{
        key: this.state.goalId,
        name: this.state.goalName,
        iterations: this.state.goalIteration
      }]),
      goalId: this.state.goalId + 1
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
        <div className='iteration-area'>
          <h2> Healthy Habits </h2>
          <div className='goal-list'>
            <h3> Goals </h3>
            <ul>
              {this.state.goals.map((goal) => [
                <li key={goal.goalId}>
                  <h3>{goal.name}</h3>
                  <div className='iterations'>
                    { [...Array(goal.iterations)].map((iteration, index) => {
                      return <input key={index} type='radio' /> 
                    })}
                  </div>
                </li>
              ])}
            </ul>
          </div>
          <div className='addIterationGoal'>
            <DropDownList
              data={this.state.goalOptions}
              value={this.state.goalName}
              onChange={this.handleNameChange}
            />
            <NumericTextBox
              value={this.state.goalIteration}
              onChange={this.handleIterationChange}
            />
            <Button primary={true} onClick={this.handleAddGoal}>
              Add Goal
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
