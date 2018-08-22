import React from 'react';
import { hot } from 'react-hot-loader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
      balance: 100,
    };
  }

  addCredits = () => {
    this.setState({
      balance: 100,
    });
  }

  render() {
    const { addCredits } = this;
    const {
      hash,
      number,
      winsCounter,
      balance,
    } = this.state;
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
              <Typography>
                {`Balance: ${balance} credits`}
              </Typography>
              <Button onClick={addCredits} disabled={balance > 0} variant="outlined">
                Free credit
              </Button>
            </div>
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
