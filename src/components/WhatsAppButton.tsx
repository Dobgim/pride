import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '19125589673';

export default function WhatsAppButton() {
  const handleClick = () => {
    const msg = encodeURIComponent(
      "Hello! I'm interested in your mobility scooters. Could you please help me?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <button
      className="whatsapp-fab"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.462 2.025 7.756L0 32l8.466-2.217A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.315 22.292c-.35.98-2.03 1.88-2.793 1.95-.713.065-1.384.322-4.666-1.037-3.93-1.63-6.453-5.65-6.646-5.91-.193-.26-1.576-2.098-1.576-4.002s.998-2.84 1.354-3.23c.356-.39.776-.488 1.034-.488.258 0 .516.002.742.013.237.012.556-.09.87.664.35.836 1.19 2.893 1.295 3.103.104.21.174.457.034.736-.14.28-.21.456-.42.703-.21.247-.44.551-.63.74-.21.21-.428.437-.185.857.243.42 1.08 1.78 2.32 2.884 1.596 1.42 2.943 1.86 3.363 2.07.42.21.664.175.908-.104.244-.28 1.048-1.225 1.328-1.645.28-.42.558-.35.94-.21.383.14 2.433 1.148 2.852 1.357.42.21.698.315.8.49.104.175.104 1.015-.246 1.995z" />
      </svg>
      <span className="whatsapp-fab-label">Chat with us</span>
    </button>
  );
}
