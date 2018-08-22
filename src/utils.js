import md5 from 'js-md5';

/**
 * Corrects a number in the range from 0 to 100
 */

export const correctNumber = (number) => {
  if (number > 100) return 100;
  if (number < 1) return 1;
  return number;
};

/**
 * Calculates a payout rate
 */

export const getPayoutRate = (winPercentage) => {
  if (winPercentage === 0) return 100;
  return Math.round((100 / winPercentage) * 100) / 100;
};

/**
 * Calculates a winning chance
 */

export const getWinningChance = (type, number, max = 100) => {
  if (type === 'hi') {
    return (max - number) / max * 100;
  }
  return number / max * 100;
};


/**
 * Generates a message with the entered number
 */

export const generateNumberMessage = (type, number) => {
  if (!number) {
    return '';
  }
  const operator = type === 'hi' ? '>=' : '<=';
  return `number ${operator} ${number}`;
};

/**
 * Generates a message with winning chance
 */

export const generateWinningChanceMessage = percentage => `chance: ${Math.round(percentage)}%`;

/**
 * Generates a message with payout rate
 */

export const generatePayoutRateMessage = (rate) => {
  if (rate) {
    return `payout: ${rate}x`;
  }
  return '';
};

/**
 * Calculates a random number
 */

export const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

/**
 * Generates md5 hash with given number
 */

export const generateHash = number => md5(number.toString());

/**
 * Substract new bet from current balance
 */

export const substractFromBalance = (bet, balance) => {
  const result = balance - bet;
  return result > 0 ? result : 0;
};

/**
 * Generate message for statistics of last round
 */

export const generateLastRoundResult = (result) => {
  if (result) {
    const { isWin, number } = result;
    return `${number} ${isWin ? 'win' : 'lose'}!`;
  }
  return '';
};
