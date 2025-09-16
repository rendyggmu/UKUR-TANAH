
import React from 'react';

const Diagram: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center my-4 p-4 border border-gray-200 rounded-lg bg-gray-50 h-full">
      <svg width="100%" height="100%" viewBox="0 0 250 160">
        <title>Diagram Kavling Tanah</title>
        {/* Quadrilateral Shape */}
        <polygon points="20,20 230,40 200,130 50,110" stroke="#6b7280" fill="#f3f4f6" strokeWidth="2" />
        
        {/* Labels for Sides */}
        <text x="125" y="25" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">Utara</text>
        <text x="125" y="145" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">Selatan</text>
        <text x="228" y="85" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold" >Timur</text>
        <text x="32" y="65" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">Barat</text>
        
      </svg>
      <p className="text-xs text-center text-gray-500 mt-2">
        Diagram representasi kavling tanah 4 sisi.
      </p>
    </div>
  );
};

export default Diagram;
