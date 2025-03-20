import { useState, useEffect } from 'react'
import Body from './Body'
import "./index.css"

function App() {
  const [data, setData] = useState([])
  const [firstValue, setFirstValue] = useState(0)
  const [secondValue, setSecondValue] = useState(10)

  const next = () =>{
    setFirstValue( prev => prev + 10)
    setSecondValue( prev => prev + 10)
  }

  const back = () => {
    setFirstValue( prev => prev - 10)
    setSecondValue( prev => prev - 10)
  }


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
          index={index}
      />
    })


  return (
    <div className='w-[650px] mx-auto'>
      <h1 className='text-center my-2 font-bold'>Table of Countries</h1>
        <table className='w-full '>
            <thead>
                <tr className='border text-[8px] md:text-[11px] font-bold'>
                    <th>S/N</th>
                    <th>Country</th>
                    <th>Capital</th>
                    <th>Flag</th>
                    <th>Status</th>
                    <th>Region</th>
                    <th>Official</th>
                    <th>Currency Symbol</th>
                    <th>Currency Name</th>
                </tr>
            </thead>
            <tbody className="text-[8px] text-center">
              {body.slice(firstValue,secondValue)}
            </tbody>
        </table>
        <div className='flex gap-2 justify-around mt-2'>
            <button 
              className='border-1 px-3 py-1'
              onClick={back}
            >
              Previous
              </button>
            <button 
              className='border-1 px-3 py-1'
              onClick={next}
            >
              Next
              </button>
        </div>
    </div>
  )
}

export default App

// flags.png or .svg ,