'use client';

import React, { useEffect, useRef, useState } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css'; 

const DualSlider = ({range, setRange}) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = noUiSlider.create(sliderRef.current, {
      start: [range.min, range.max],
      connect: true,
      step: 1000,
      range: {
        min: 0,
        max: 1500000,
      },
    });

    slider.on('update', (values) => {
      const [minVal, maxVal] = values.map(Number);
      setRange({ min: minVal, max: maxVal });
    });

    return () => slider.destroy();
  }, []);

  return (
    <div className="w-full max-w-xl px-4 py-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-black font-medium">Salary Per Month</span>
        <span className="text-black font-semibold">
          ₹{range.min / 1000}k - ₹{range.max / 1000}k
        </span>
      </div>
      <div ref={sliderRef} className="slider h-2" />
    </div>
  );
};

export default DualSlider;
