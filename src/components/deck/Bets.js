export class Bets {
  constructor(hand, lead_bettor) {
    this.hand = hand;
    this.lead_bettor = lead_bettor;
    this.CHIP_TYPES = [1, 2, 5, 10, 20, 50, 100];
    this.bet = 0;
    this.bet_chips = [];
  };

  randInRange(min, max) {
    return Math.random() * (max - min) + min;
  };

  getChips(value) {
    if (value === 0) { return 0; }
    let res = Number.MAX_VALUE;
    for (let i = 0; i < this.CHIP_TYPES.length; i++) {
      if (this.CHIP_TYPES[i] <= value) {
        let sub_res = this.getChips(value - this.CHIP_TYPES[i]);
        this.bet_chips.push(this.CHIP_TYPES[i]);
        if (sub_res !== Number.MAX_VALUE && sub_res + 1 < res) {
          res = sub_res + 1;
        }
      }
    };
    return res;
  };

  getBet() {
    // var bet = Math.floor(this.randInRange(0, 20));
    var bet = 8;
    this.bet = bet;
    var chips_num = this.getChips(bet);
    var chips = this.bet_chips.slice(chips_num*-1);
    this.bet_chips = [];
    var chipsClass = chips.length > 1 ? 'multiple' : 'single';
    return [chips, chipsClass];
  };

}