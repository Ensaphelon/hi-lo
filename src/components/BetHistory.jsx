import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const generateWinPhrase = condition => (
  condition ? 'win' : 'lose'
);

const generateHistoryItem = (item, index) => `${index}. Bet amount: ${item.betAmount}; 
The number ${item.roundResult.number} is ${generateWinPhrase(item.roundResult.winCondition)};
Provably Fair Hash: ${item.hash}; Running total is: ${item.balance}`;

const BetHistory = (props) => {
  const { autoBetHistory } = props;
  return (
    <List>
      {autoBetHistory.reverse().map((item, index) => (
        <ListItem key={item.betNumber}>
          <ListItemText primary={generateHistoryItem(item, autoBetHistory.length - index)} />
        </ListItem>
      ))}
    </List>
  );
};

export default BetHistory;
