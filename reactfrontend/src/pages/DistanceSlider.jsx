import React, { useState } from 'react';
import { Slider } from '@mui/material';
import { styled } from '@mui/system';

const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.5,
    fontSize: 11,
    background: 'unset',
    padding: 0,
    width: 35,
    height: 35,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

const DistanceSlider = ({ value, onChange } ) => {

  const handleSliderChange = (event, newValue) => {
    console.log("Slider changed to:", newValue); 
    onChange(newValue);
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      
      <PrettoSlider
        value={value}
        min={1}
        max={50}
        step={1}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} km`}
      />
       <h3 className='text-center'>Adjust Distance: {value} km</h3>
    </div>
  );
};

export default DistanceSlider;
