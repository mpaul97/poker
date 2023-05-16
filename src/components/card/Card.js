import './Card.css';
import allCards from '../../assets/card-deck.png';
import React from 'react';

export class CardModel {
  constructor(key, suit, type, op_h, op_v, inactive) {
    this.key = key;
    this.suit = suit;
    this.type = type;
    this.op_h = op_h;
    this.op_v = op_v;
    this.inactive = inactive;
  }
  get getKey() {
    return this.key;
  }
};

function Card(props) {
  const [inactive, setInactive] = React.useState(props.inactive);
  const toggleInactive = () => {
    setInactive(!inactive)
  };
  let cardClass = "card " + props.suit + "-" + props.type; 
  let object_pos = {objectPosition: props.op_h + "% " + props.op_v + "%"};
  let displayFace = {display: !inactive ? '' : 'none'};
  let containerClass = "container ";
  return (
    <div className={containerClass}>
      <img 
        className={cardClass}
        src={allCards}
        style={{...object_pos, ...displayFace}}
      />
      <div 
        className='card-back' 
        style={inactive ? { display: '' } : { display : 'none' }}
      >
        <div className='inner-card-back'>
          <div className='inner-card-back two'>
            <div className='inner-card-back three'>
              <div className='inner-card-back four'>
                <div className='inner-card-back five'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;