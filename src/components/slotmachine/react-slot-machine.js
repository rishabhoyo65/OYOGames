import React       from 'react';
import ReactDOM    from 'react-dom';

import SlotMachine from "react-slot-machine-gen";

const imageUrl = 'https://nuxy.github.io/slot-machine-gen/images';

const reels = [
  {
    imageSrc: `${imageUrl}/reel-strip1.png`,
    symbols: [
      {
        title: 'cherry',
        position: 100,
        weight: 2
      },
      {
        title: 'plum',
        position: 300,
        weight: 6
      },
      {
        title: 'orange',
        position: 500,
        weight: 5
      },
      {
        title: 'bell',
        position: 700,
        weight: 1
      },
      {
        title: 'cherry',
        position: 900,
        weight: 3
      },
      {
        title: 'plum',
        position: 1100,
        weight: 5
      }
    ]
  },
  {
    imageSrc: `${imageUrl}/reel-strip2.png`,
    symbols: [
      {
        title: 'orange',
        position: 100,
        weight: 6
      },
      {
        title: 'plum',
        position: 300,
        weight: 5
      },
      {
        title: 'orange',
        position: 500,
        weight: 3
      },
      {
        title: 'plum',
        position: 700,
        weight: 5
      },
      {
        title: 'cherry',
        position: 900,
        weight: 2
      },
      {
        title: 'bell',
        position: 1100,
        weight: 1
      }
    ]
  },
  {
    imageSrc: `${imageUrl}/reel-strip3.png`,
    symbols: [
      {
        title: 'cherry',
        position: 100,
        weight: 4
      },
      {
        title: 'bell',
        position: 300,
        weight: 1
      },
      {
        title: 'orange',
        position: 500,
        weight: 6
      },
      {
        title: 'plum',
        position: 700,
        weight: 5
      },
      {
        title: 'plum',
        position: 900,
        weight: 3
      },
      {
        title: 'cherry',
        position: 1100,
        weight: 2
      }
    ]
  }
];

export default class Demo extends React.Component {
  constructor() {
    super();

    this.state = {
      play: false
    };
  }

  playEvent() {
    this.setState({
      play: !this.state.play
    });
  }

  render() {
    return (
      <React.Fragment>
        <SlotMachine reels={reels} play={this.state.play} />

        <button id="play-button" onClick={() => this.playEvent()}>Play</button>
      </React.Fragment>
    );
  }
};

//ReactDOM.render(<Demo />, document.getElementById('main'));
