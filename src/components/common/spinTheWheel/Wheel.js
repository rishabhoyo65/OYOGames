import React,{useState} from 'react';
import "./spinthewheel.scss";

export default function Wheel(props) {
    const [selectedItem, setSelectedItem] = useState(null); 

    const selectItem = () => {
        if (selectedItem === null) {
          const select = Math.floor(Math.random() * props.items.length);
          if (props.onSelectItem) {
            props.onSelectItem(props.items[select]._id);
          }
          setSelectedItem(select)
        } else {
          setSelectedItem(null)
          setTimeout(() => selectItem(), 500);
          
        }
      }

    const wheelVars = {
        '--nb-item': props.items.length,
        '--selected-item': selectedItem,
      };

    const portionJsx = props.items.map((item, index) => (
      <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
      {item.location}
      </div>
  ))

    return (
        <div className="wheel-container">
            <div className={`wheel ${selectedItem !== null ? 'spinning' : ''}`} style={wheelVars} onClick={selectItem}>
            {portionJsx}
            </div>
        </div>
    )
}
