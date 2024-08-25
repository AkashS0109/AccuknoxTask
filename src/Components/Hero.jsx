import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSync } from "react-icons/md";
import '../App.css'; // Ensure this path is correct

export default function Hero() {
  return (
    <div className='hero-outer'>
      <div className='hero-upper'>
        <div className='hero-upper-left'>
          <h1>CNAPP Dashboard</h1>
        </div>
        <div className='hero-upper-right'>
          <button className='add-widget-button'>
            <h4>Add Widget &nbsp;<IoMdAdd className='add-icon' /></h4>
          </button>
          <MdOutlineSync className='sync-icon' />
          <select className='options-dropdown'>
            <option value="option1">Last 2days</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
