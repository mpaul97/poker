import './Chip.css';

export default function Chip(props) {
  var value = props.value;
  var color = 0;
  switch (value) {
    case 1:
      color = [74, 80, 168];
      break;
    case 2:
      color = [83, 168, 74];
      break;
    case 5:
      color = [161, 48, 54];
      break;
    case 10:
      color = [189, 46, 21];
      break;
    case 20:
      color = [21, 127, 189];
      break;
    case 50:
      color = [188, 169, 44];
      break;
    case 100:
      color = [50, 50, 50];
      break;
    default:
      color = [155, 37, 161];
      break;
  }
  return (
    <div 
      className={"chip-container " + props.classType}
      style={{ background: `rgb(${color})` }}
    >
      <p 
        className='chip-value'
      >
        {value === 'D' ? value : '$' + value}
      </p>
    </div>
  )
};