import React from 'react';
import { hot } from 'react-hot-loader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Form from './Form';
import { generateHash, getRandomNumber, substractFromBalance } from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    const number = getRandomNumber();
    this.state = {
      hash: generateHash(number),
      number,
      winsCounter: 0,
      balance: 100,
      betIsProcessing: false,
    };
  }

  addCredits = () => {
    this.setState({
      balance: 100,
    });
  }

  makeBet = (bet, guessingNumber, payoutRate, betType) => {
    const { number, balance } = this.state;
    if (bet <= balance) {
      const isWin = (betType === 'hi' && guessingNumber < number) || (betType === 'lo' && guessingNumber > number);
      this.setState({
        betIsProcessing: true,
        balance: substractFromBalance(bet, balance),
      });
      if (isWin) {
        this.setState({
          balance: Math.round((balance + (payoutRate[betType] * bet)) * 100) / 100,
        });
      }
      const newNumber = getRandomNumber();
      this.setState({
        betIsProcessing: false,
        number: newNumber,
        hash: generateHash(newNumber),
      });
    }
  }

  render() {
    const { addCredits, makeBet } = this;
    const {
      hash,
      number,
      winsCounter,
      balance,
      betIsProcessing,
    } = this.state;
    return (
      <div className="apps">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="headline" gutterBottom>
              Endpass Dice
            </Typography>
            <Form makeBet={makeBet} betIsProcessing={betIsProcessing} number={number} />
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
