import React from 'react';
import { hot } from 'react-hot-loader';
import { times } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Form from './Form';
import {
  generateHash,
  getRandomNumber,
  substractFromBalance,
  generateLastRoundResult,
  isWin,
  calcPrize,
} from '../utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    const number = getRandomNumber();
    this.state = {
      hash: generateHash(number),
      number,
      lastRoundResult: null,
      balance: 100,
      betIsProcessing: false,
      autoBetHistory: [],
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
      const winCondition = isWin(betType, guessingNumber, number);
      const newNumber = getRandomNumber();
      this.setState({
        betIsProcessing: true,
        number: newNumber,
        hash: generateHash(newNumber),
        balance: winCondition ? Math.round((balance + (payoutRate[betType] * bet)) * 100) / 100
          : substractFromBalance(bet, balance),
        lastRoundResult: {
          winCondition,
          number,
        },
      }, () => {
        this.setState({
          betIsProcessing: false,
        });
      });
    }
  }

  makeAutoBet = (type, bet, autoBetNumber, guessingNumber, payoutRate) => {
    let currentState = { ...this.state };
    times(autoBetNumber, (step) => {
      const newNumber = getRandomNumber();
      const hash = generateHash(newNumber);
      const winCondition = isWin(type, guessingNumber, newNumber);
      const { balance } = currentState;
      if (bet <= balance) {
        currentState = {
          number: newNumber,
          hash,
          balance: winCondition ? calcPrize(balance, payoutRate[type], bet)
            : substractFromBalance(bet, balance),
          lastRoundResult: {
            winCondition,
            number: newNumber,
          },
          autoBetHistory: [
            ...currentState.autoBetHistory,
            {
              betNumber: step + 1,
              betAmount: bet,
              roundResult: {
                winCondition,
                newNumber,
              },
              hash,
              balance: substractFromBalance(bet, balance),
            },
          ],
        };
      }
    });
    this.setState({
      ...currentState,
    });
  }

  render() {
    const { addCredits, makeBet, makeAutoBet } = this;
    const {
      hash,
      number,
      balance,
      betIsProcessing,
      lastRoundResult,
    } = this.state;
    return (
      <div className="apps">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="headline" gutterBottom>
              Endpass Dice
            </Typography>
            <Form
              makeAutoBet={makeAutoBet}
              makeBet={makeBet}
              betIsProcessing={betIsProcessing}
              number={number}
            />
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
                {generateLastRoundResult(lastRoundResult)}
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
