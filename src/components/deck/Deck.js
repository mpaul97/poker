import Card, { CardModel } from "../card/Card";
import React from 'react';
import './Deck.css';
import Chip from "../chip/Chip";
import { Bets } from './Bets';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const CARD_TYPES = [...Array(13).keys()].map(x => x+1);
const CARD_SUITS = ['spades', 'hearts', 'diamond', 'clubs'];

const H_SPACING = [
  0.64, 8.9, 17.1, 25.34, 33.56, 41.8,     // 1, 2, 3, 4, 5, 6
  49.98, 58.24, 66.46, 74.7, 82.9, 91.18,  // 7, 8, 9, 10, 11, 12
  99.38                                    // 13
];

const SPADES_V = 2;
const HEARTS_V = 34;
const DIAMOND_V = 66;
const CLUBS_V = 98;

function shuffleArr(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  return arr;
}

function getDeck(num_decks, num_cards) {
  var deck = [...Array(num_decks).keys()].map(function(deck_num) {
    return (
      CARD_TYPES.map(function(type, index) {
        return CARD_SUITS.map(function(suit) {
          let v_space = SPADES_V;
          if (suit === "hearts") {
            v_space = HEARTS_V;
          } else if (suit === 'diamond') {
            v_space = DIAMOND_V;
          } else if (suit === 'clubs') {
            v_space = CLUBS_V;
          };
          return (
            new CardModel(
              (suit + "-" + type + "-" + deck_num),
              suit,
              type,
              H_SPACING[index],
              v_space,
              true
            )
          );
        })
      }).flat()
    )
  }).flat();
  deck = shuffleArr(deck);
  deck = deck.slice(0, num_cards);
  return deck;
}

function getBlinds(dealer_index, all_hands_length) {
  var small_idx = (dealer_index + 1) % all_hands_length;
  var big_idx = (dealer_index + 2) % all_hands_length;
  return [small_idx, big_idx];
}

export default function Deck(props) {
  var deck = getDeck(props.num_decks, (5 + props.num_hands*2));
  var flop = deck.slice(0, 5);
  var all_hands = [];
  for (var i = 5; i < deck.length; i += 2) {
    var firstCard = deck[i];
    var secondCard = deck[i+1];
    all_hands.push([firstCard, secondCard]);
  };
  var [small_idx, big_idx] = getBlinds(props.dealer, all_hands.length);
  // get lead bet
  var lead_bettor = props.lead_bettor;
  var bet = new Bets(all_hands[lead_bettor], lead_bettor);
  var [lead_bet_chips, chipsClass] = bet.getBet();
  return (
    <div className="container">
      <div className="all-hands">
        {
          all_hands.map(function(hands, index) {
            return (
              <div key={"hand-" + index} className="hand">
                {index !== 0 ? <h3 className="hand-title">Hand {index}</h3> : <h3 className="hand-title">Your Hand</h3>}
                {
                  hands.map(function(card) {
                    return (
                      <Card 
                        key={card.key}
                        suit={card.suit}
                        type={card.suit}
                        op_h={card.op_h}
                        op_v={card.op_v}
                        inactive={index !== 0 ? true : false}
                      />
                    )
                  })
                }
                {props.dealer === index ?
                  <Chip value={'D'} />
                  : 
                  ''
                }
                {small_idx === index ?
                  <Chip value={1} />
                  :
                  ''
                }
                {big_idx === index ?
                  <Chip value={2}/>
                  :
                  ''
                }
                {props.lead_bettor === index ?
                  <div className="bets">
                    {lead_bet_chips.map(function(value, index) {
                      return (
                        <Chip 
                          key={index + "-" + value} 
                          value={value}
                          classType={chipsClass}
                        />
                      )
                    })}
                  </div>
                  :
                  ''
                }
              </div>
            )
          })
        }
      </div>
      <div className="main-info">
        <div className="info-container">
          <div className="bet-container">
            <h3>Current Bet: {bet.bet}</h3>
          </div>
          <AwesomeButton type="danger">Fold</AwesomeButton>
          <AwesomeButton type="primary">Raise</AwesomeButton>
          <AwesomeButton type="secondary">Check</AwesomeButton>
        </div>
      </div>
      <div className="flop">
        <h3 className="hand-title">Flop</h3>
        {
          flop.map(function(card) {
            return (
              <Card 
                key={card.key}
                suit={card.suit}
                type={card.suit}
                op_h={card.op_h}
                op_v={card.op_v}
                inactive={true}
              />
            )
          })
        }
      </div>
    </div>
  )
};