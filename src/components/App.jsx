import React from 'react';
import { hot } from 'react-hot-loader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Form from './Form';
import { generateHash, getRandomNumber } from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    const number = getRandomNumber();
    this.state = {
      hash: generateHash(number),
      number,
      winsCounter: 0,
    };
  }

  render() {
    const { hash, number, winsCounter } = this.state;
    return (
      <div className="apps">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="headline" gutterBottom>
              Endpass Dice
            </Typography>
            <Form number={number} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <Typography variant="headline">Result</Typography>
              <Typography>
                {`${winsCounter} `}
                wins!
              </Typography>
            </div>
            <div>
              <Typography>Provably Fair Hash</Typography>
              <Typography>{hash}</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default hot(module)(App);
