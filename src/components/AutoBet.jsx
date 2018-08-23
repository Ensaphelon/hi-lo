import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export default class AutoBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoBetNumber: '',
    };
  }

  submit = (e) => {
    e.preventDefault();
    const {
      makeAutoBet,
      type,
      number,
      payoutRate,
      bet,
    } = this.props;
    const { autoBetNumber } = this.state;
    makeAutoBet(type, bet, autoBetNumber, number, payoutRate);
  }

  changeNumber = (e) => {
    e.preventDefault();
    this.setState({
      autoBetNumber: e.target.value,
    });
  }

  render() {
    const { changeNumber, submit } = this;
    const { autoBetNumber } = this.state;
    const { type } = this.props;
    return (
      <FormControl margin="normal" fullWidth>
        <Input
          placeholder="Number of Bets"
          type="number"
          onChange={changeNumber}
          value={autoBetNumber}
        />
        <Button onClick={submit} type="submit" variant="contained">
          {`Auto Bet (${type})`}
        </Button>
      </FormControl>
    );
  }
}
