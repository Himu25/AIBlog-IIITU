import React from 'react'
import EditorsPick from './EditorsPick'

export default function MostPopular() {
    return (
        <>
            <p className="mt-8 px-10 text-xs">Chosen By Editor</p>
            <h4 className="text-bold px-10 font-bold">Editors Pick</h4>
            <div className="flex flex-col mt-8 px-10">
                <div>
                <div className="inline-block whitespace-nowrap text-xs py-1 px-3 bg-[#ff795736] rounded-full">Fest</div>
                <div className="text-md mt-2 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</div>
                <div className="text-xs mt-2"><span className='font-bold'>John Doe -</span><span className='ms-1 text-[10px]'>10.03.2023</span></div>
                </div>
                <div className='mt-2'>
                <div className="inline-block whitespace-nowrap text-xs py-1 px-3 bg-[#da85c731] rounded-full">Career</div>
                <div className="text-md mt-2 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</div>
                <div className="text-xs mt-2"><span className='font-bold'>John Doe -</span><span className='ms-1 text-[10px]'>10.03.2023</span></div>
                </div>
                <div className='mt-2'>
                <div className="inline-block whitespace-nowrap text-xs py-1 px-3 bg-[#ff795736] rounded-full">Fest</div>
                <div className="text-md mt-2 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</div>
                <div className="text-xs mt-2"><span className='font-bold'>John Doe -</span><span className='ms-1 text-[10px]'>10.03.2023</span></div>
                </div>
                <div className='mt-2'>
                <div className="inline-block whitespace-nowrap text-xs py-1 px-3 bg-[#ff795736] rounded-full">Fest</div>
                <div className="text-md mt-2 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</div>
                <div className="text-xs mt-2"><span className='font-bold'>John Doe -</span><span className='ms-1 text-[10px]'>10.03.2023</span></div>
                </div>
            </div>
            <EditorsPick />
        </>
    )
}
