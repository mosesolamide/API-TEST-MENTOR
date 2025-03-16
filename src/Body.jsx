import React from "react"

export default function Body({country,index,capital,official,region,currencyName,currencySymbol,flag,status}){
    return(
        <>
                <tr className="border">
                    <td className="p-5">{country}</td>
                    <td className="p-5">{capital}</td>
                    <td className="p-5"><img src={flag} alt="flags"  className="w-9 h-auto"/></td>
                    <td className="p-5">{status}</td>
                    <td className="p-5">{region}</td>
                    <td className="p-5">{official}</td>
                    <td className="p-5">{currencySymbol}</td>
                    <td className="p-5">{currencyName}</td>
                </tr>

        </>
    )
}