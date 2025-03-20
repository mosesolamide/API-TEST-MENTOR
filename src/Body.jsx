import React from "react"

export default function Body({country,index,capital,official,region,currencyName,currencySymbol,flag,status}){
    return(
        <ul className="grid grid-cols-9 items-center gap-2 text-[6px] md:text-[7px] w-full px-4 bg-white my-1 rounded-[2px] h-[40px] shadow">
            <li className="font-black text-center">{index}</li>
            <li className="flex justify-center">{country}</li>
            <li className="flex justify-center">{capital}</li>
            <li className="flex justify-center"><img src={flag} alt="flags" className="max-w-[20px] max-h-[20px]"/></li>
            <li className="flex justify-center">{status}</li>
            <li className="flex justify-center">{region}</li>
            <li className="flex justify-center">{official}</li>
            <li className="flex justify-center">{currencySymbol}</li>
            <li className="flex justify-center">{currencyName}</li>
        </ul>
    )
}