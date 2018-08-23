import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AutoBet from './AutoBet';
import WinningConditions from './WinningConditions';
import { getWinningChance, getPayoutRate, correctNumber } from '../utils';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNumber: 100,
      winPercentage: {
        hi: '',
        lo: '',
      },
      bet: '',
      number: '',
      payoutRate: {
        hi: '',
        lo: '',
      },
    };
  }

  changeBet = (e) => {
    this.setState({
      bet: e.target.value,
    });
  }

  changeNumber = (e) => {
    const { maxNumber } = this.state;
    const number = Math.round(correctNumber(e.target.value));
    const hiWinChance = getWinningChance('hi', number, maxNumber);
    const loWinChance = getWinningChance('lo', number, maxNumber);
    this.setState({
      number,
      winPercentage: {
        hi: hiWinChance,
        lo: loWinChance,
      },
      payoutRate: {
        hi: getPayoutRate(hiWinChance),
        lo: getPayoutRate(loWinChance),
      },
    });
  }

  submit = (e, betType) => {
    e.preventDefault();
    const { bet, number, payoutRate } = this.state;
    const { makeBet } = this.props;
    if (bet && number) {
      makeBet(bet, number, payoutRate, betType);
    }
  }

  render() {
    const { changeBet, changeNumber, submit } = this;
    const {
      betIsProcessing,
      makeAutoBet,
      toggleMartingale,
      martingale,
    } = this.props;
    const {
      bet,
      number,
      payoutRate,
      winPercentage,
    } = this.state;
    return (
      <form>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12} sm={12} md={5}>
            <FormControl margin="normal" fullWidth>
              <Input
                placeholder="Bet Amount"
                type="number"
                value={bet}
                onChange={changeBet}
              />
            </FormControl>
            <Button onClick={e => submit(e, 'hi')} disabled={betIsProcessing} type="submit" variant="contained">
              Bet Hi
            </Button>
            <AutoBet
              bet={bet}
              number={number}
              payoutRate={payoutRate}
              makeAutoBet={makeAutoBet}
              type="hi"
            />
            {number ? <WinningConditions winPercentage={winPercentage} payoutRate={payoutRate} number={number} type="hi" /> : '' }
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <FormControl margin="normal" fullWidth>
              <Input
                placeholder="Number"
                type="number"
                value={number}
                onChange={changeNumber}
              />
            </FormControl>
            <Button onClick={e => submit(e, 'lo')} disabled={betIsProcessing} type="submit" variant="contained">
              Bet Lo
            </Button>
            <AutoBet
              bet={bet}
              number={number}
              payoutRate={payoutRate}
              makeAutoBet={makeAutoBet}
              type="lo"
            />
            {number ? <WinningConditions winPercentage={winPercentage} payoutRate={payoutRate} number={number} type="lo" /> : '' }
          </Grid>
        </Grid>
        <FormControlLabel
          control={(
            <Checkbox
              checked={martingale}
              onChange={toggleMartingale}
              value="martingale"
            />
          )}
          label="Martingale strategy is active"
        />
      </form>
    );
  }
}
