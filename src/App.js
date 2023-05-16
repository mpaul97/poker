import './App.css';
import Card from './components/card/Card';
import Chip from './components/chip/Chip';
import Deck, {setDeck} from './components/deck/Deck';
import React, { useState } from 'react';

function App() {
  var chips = ['D', 1, 2, 5, 10, 20, 50, 100];
  var [dealer, setDealer] = useState(0);
  var [lead_bettor, setLeadBettor] = useState(dealer + 3);
  var num_decks = 1;
  var num_hands = 5;

  const moveDealer = () => {
    if (dealer + 1 === num_hands) {
      setDealer(0);
      return;
    }
    if (lead_bettor + 1 === num_hands) {
      setLeadBettor(0);
      return;
    }
    setDealer(dealer + 1);
    setLeadBettor(lead_bettor + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Deck 
            dealer={dealer}
            lead_bettor={lead_bettor}
            num_decks={num_decks}
            num_hands={num_hands}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
