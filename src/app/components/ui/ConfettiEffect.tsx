import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      // Disparar confeti desde la izquierda
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
      });

      // Disparar confeti desde la derecha
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
      });

      // Disparar confeti desde el centro
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [trigger]);

  return null;
};

export default ConfettiEffect;