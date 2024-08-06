import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black'>
        <header>
            <nav className='p-4 flex flex-row justify-around'>
                <div>
                    <figure>
                        <img className='h-8' src="./public/logo.png" alt="" />
                    </figure>
                </div>
                <div>
                    <input className='p-2 bg-[#04594D]' type="text" placeholder="Search for headlines..." />
                    <button className='py-2 px-4 bg-[#8E4042] text-[#F7F7F4]'>Search</button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
