import React from 'react';
import Time from '../assets/time.svg'

function Header() {
    return (
        <header className="bg-[#DFDFDF] text-white p-4">
        <div>
            <div className='flex justify-between'>
                <img src={Time} alt="Time Logo" className='w-10 h-10' />
            </div>
        </div>
        </header>
    );
}

export default Header;