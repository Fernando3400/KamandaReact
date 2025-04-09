import React, { Component } from 'react';
import som from "../assets/sons/call-to-attention-123107.mp3"

class RingBell extends Component {
  playSound = () => {
    const audio = new Audio(som);

    setTimeout(() => {
      audio.play();
    }, 5000); // Reproduza o som após 5 segundos (ajuste conforme necessário)
  }

  render() {
    return (
      <div>
        <button onClick={this.playSound}>Iniciar contagem regressiva</button>
      </div>
    );
  }
}

export default RingBell;
