import React from "react"

export default function Body({country,index,capital,official,region,currencyName,currencySymbol,flag,status}){
    return(
        <>
                <tr className="border">
                    <td className="font-black">{index + 1}</td>
                    <td className="p-2">{country}</td>
                    <td className="p-2">{capital}</td>
                    <td className="p-2"><img src={flag} alt="flags" className="w-[40px]"/></td>
                    <td className="p-2">{status}</td>
                    <td className="p-2">{region}</td>
                    <td className="p-2">{official}</td>
                    <td className="p-2">{currencySymbol}</td>
                    <td className="p-2">{currencyName}</td>
                </tr>

        </>
    )
}