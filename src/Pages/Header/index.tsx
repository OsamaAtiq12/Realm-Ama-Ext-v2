import React from 'react'
import CustomDropdown from '../../Components/Dropdown'
import Profile from './Assets/profile'
import Cross from './Assets/Cross'
function Header() {
  return (
  <div className='flex justify-between items-center'>
 
    <span className='text-[#5C1EDF] font-semibold text-[18px]'>Ask Elon</span>
     
    <div className='flex items-center gap-4'>
    <CustomDropdown/>
    <Profile/>
    <span onClick={() => window.close()}>
          <Cross/>
        </span>
    </div>

     
  </div>
  )
}

export default Header