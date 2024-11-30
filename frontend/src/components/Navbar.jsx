import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full px-2 bg-custom1 '>
            <div className="navbar w-full flex justify-between items-center">
                <div className='flex'>
                    <div className="dropdown md:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'>
                                <Link to={"/product"}>
                                    Product
                                </Link>
                            </li>

                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={"/addcustomers"}>Customers</Link> </li>
                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={'/categories'}>Categories</Link></li>
                        </ul>
                    </div>

                    <div className="flex">
                        <Link to={'/'}  className="btn btn-ghost text-2xl font-extrabold">MERI <span className='text-pink-600'>DUKAN</span></Link>
                    </div>

                </div>
                <div>
                    <ul className='hidden md:flex gap-20 text-xl font-semibold cursor-pointer'>
                        <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'>
                            <Link to={"/product"}>
                                Product
                            </Link>
                        </li>

                        <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={"/addcustomers"}>Customers</Link> </li>
                        <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={'/categories'}>Categories</Link></li>
                    </ul>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'>
                                <Link to={"/product"}>
                                    Product
                                </Link>
                            </li>

                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={"/addcustomers"}>Customers</Link> </li>
                            <li className='hover:bg-white text-pink-600 hover:text-black py-2 px-2 rounded-xl'><Link to={'/categories'}>Categories</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
