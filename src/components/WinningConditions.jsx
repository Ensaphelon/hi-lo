import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { generateNumberMessage, generateWinningChanceMessage, generatePayoutRateMessage } from '../utils';

const WinningConditions = (props) => {
  const {
    type,
    payoutRate,
    winPercentage,
    number,
  } = props;
  return (
    <List>
      <ListItem>
        <ListItemText primary={generateNumberMessage(type, number)} />
      </ListItem>
      <ListItem>
        <ListItemText primary={generateWinningChanceMessage(winPercentage[type])} />
      </ListItem>
      <ListItem>
        <ListItemText primary={generatePayoutRateMessage(payoutRate[type])} />
      </ListItem>
    </List>
  );
};

export default WinningConditions;
