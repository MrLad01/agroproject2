import React from 'react'

const Blog = () => {
  return (
    <div className='bg-white py-4 px-6 flex-col items-center justify-center'>
      <h1 className='text-[#1A1A1A] text-center work-sans text-[16px] font-bold'>BLOG</h1>
      <h2 className='text-[#1A1A1A] text-center text-[46px] font-semibold eb-garamond'>Latest From Our Blog</h2>
      <p className='text-[#5A5A5A] text-center work-sans text-[16px] font-normal'>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit. Sed et rhoncus lacus.</p>
      <div className='flex justify-center items-center'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div  className='flex justify-center items-center'>
      <button className='border text-[#101996] rounded-3xl border-[#101996] px-5 py-2 work-sans text-[16px] font-normal'>VIEW ALL BLOG</button>
      </div>
    </div>
  )
}

export default Blog