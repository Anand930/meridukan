import React from 'react'
import heroBanner from '/heroBanner.png'

const Hero = () => {
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-2 px-2'>
                <div className=' w-full md:w-1/2 order-2  flex items-center justify-center '>
                    <img src={heroBanner} alt="herobanner" />
                </div>
                <div className=' w-full md:w-1/2 order-1 flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-[50px] font-extrabold text-center leading-tight py-3'>

                            <span className='text-slate-400'>Your</span> <span className='text-pink-600'>One-Stop</span> <br /> <span className='text-pink-600'>Grocery</span> <span className='text-slate-400'>Destination</span> 
                        </p>
                        <p className='text-center text-pink-400'>Whether you’re stocking up on fresh fruits, daily staples, or gourmet treats, we’ve got it all. <br /> Your convenience and satisfaction are our priorities.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
