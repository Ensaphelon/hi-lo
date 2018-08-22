import * as utils from '../src/utils';

describe('Utils', () => {
  test('Should not exceed the range from 0 to 100', () => {
    const { correctNumber } = utils;
    expect(correctNumber(0)).toEqual(1);
    expect(correctNumber(110)).toEqual(100);
    expect(correctNumber(50)).toEqual(50);
  });
  test('Should correctly calculate a payout rate', () => {
    const { getPayoutRate } = utils;
    expect(getPayoutRate(0)).toEqual(100);
    expect(getPayoutRate(100)).toEqual(1);
    expect(getPayoutRate(50)).toEqual(2);
    expect(getPayoutRate(90)).toEqual(1.11);
  });
  test('Should correctly calculate a winning chance', () => {
    const { getWinningChance } = utils;
    expect(getWinningChance('hi', 25)).toEqual(75);
    expect(getWinningChance('lo', 25)).toEqual(25);
    expect(getWinningChance('hi', 100, 200)).toEqual(50);
    expect(Math.round(getWinningChance('lo', 100, 300))).toEqual(33);
  });
  test('Should correctly generate a message with the entered number', () => {
    const { generateNumberMessage } = utils;
    expect(generateNumberMessage('lo', 12)).toEqual('number <= 12');
    expect(generateNumberMessage('hi', 25)).toEqual('number >= 25');
    expect(generateNumberMessage('hi')).toEqual('');
  });
  test('Should correctly generate a md5', () => {
    const { generateHash } = utils;
    expect(generateHash(10)).toEqual('d3d9446802a44259755d38e6d163e820');
    expect(generateHash(30)).toEqual('34173cb38f07f89ddbebc2ac9128303f');
  });
});
