import { useState, useEffect } from 'react'
import Body from './Body'
import "./index.css"

function App() {
  const [data, setData] = useState([])

    useEffect( () =>{
      const renderData = async () => {
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json()
        setData(data)
        // console.log(data[0])
      }
      renderData()
    },[])

    const body = data.map( (country,index) => {
      const currency = country.currencies ? Object.values(country.currencies)[0] : null

      return <Body 
          country={country.name.common}
          official={country.name.official}
          capital={country.capital}
          region={country.region}
          currencyName={currency ? currency.name : "N/A"} 
          currencySymbol={currency ? currency.symbol : "N/A"}
          flag={country.flags.png}
          status={country.status}
          key={index}

      />
    })


  return (
    <table className='w-full'>
        <thead>
            <tr className='border text-[8px]'>
                <th>Country:</th>
                <th>Capital:</th>
                <th>Flag:</th>
                <th>Status:</th>
                <th>Region:</th>
                <th>Official:</th>
                <th>Currency Symbol:</th>
                <th>Currency Name:</th>
            </tr>
        </thead>
        <tbody className="text-[8px] text-center">
          {body}
        </tbody>
    </table>
  )
}

export default App

// flags.png or .svg ,