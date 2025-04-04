import { useState, useEffect } from 'react'
import Body from './Body'
import "./index.css"
import Pagination from './Pagination'
import { PiEmpty } from "react-icons/pi"

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchByCountry, setSearchByCountry] = useState("")
  const [searchByCapital, setSearchByCapital] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const renderData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      let apiUrl = "https://restcountries.com/v3.1/all"
      
      if (searchByCountry) {
        apiUrl = `https://restcountries.com/v3.1/name/${searchByCountry}`
      } else if (searchByCapital) {
        apiUrl = `https://restcountries.com/v3.1/capital/${searchByCapital}`
      }

      const res = await fetch(apiUrl)
      if (!res.ok) {
        throw new Error(res.status === 404 ? "No countries found" : "API error")
      }
      const data = await res.json()
      setData(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setError(err.message)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const search = () => {
    const searchValues = document.getElementById("searchByCountry").value
    setSearchByCountry(searchValues)
  }
  const searchByCapitals = () => {
    const searchValues = document.getElementById("searchByCapital").value
    setSearchByCapital(searchValues)
  }

  useEffect(() => {
    renderData()
  }, [searchByCapital, searchByCountry])

  const lastPostIndex = page * limit
  const firstPostIndex = lastPostIndex - limit
  const currentData = data.slice(firstPostIndex, lastPostIndex)

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center items-center h-[50vh] gap-2'>
          <span className='w-[35px] h-[35px] border-[5px] border-black border-solid border-b-transparent rounded-[50%] inline-block box-border animate-spin'></span> <br />
          <p className='text-2xl'>Loading countries...</p>
        </div>
      )
    }

    if (currentData.length === 0) {
      return (
        <div className='flex flex-col justify-center items-center h-[50vh]'>
          <PiEmpty size={100} className='text-gray-400' />
          <p className='text-2xl mt-5'>No countries match your search</p>
        </div>
      )
    }

    return currentData.map((country, index) => {
      const currency = country.currencies ? Object.values(country.currencies)[0] : null

      return (
        <Body 
          country={country.name.common}
          official={country.name.official}
          capital={country.capital}
          region={country.region}
          currencyName={currency ? currency.name : "N/A"} 
          currencySymbol={currency ? currency.symbol : "N/A"}
          flag={country.flags.png}
          status={country.status}
          index={firstPostIndex + index + 1}
          key={country.cca3}
        />
      )
    })
  }

  return (
    <div className='min-w-[400px]'>
      <div className='flex justify-center gap-2 items-center'>
        <label>Search By: </label>
        <input 
          type="search" 
          placeholder='Country name' 
          id='searchByCountry' 
          className={`border indent-[2px] px-2 py-1 rounded-[2px] border-sky-500 my-2 w-[130px] text-sm ${searchByCapital? "cursor-not-allowed border-none" : ""}`} 
          onChange={search}
          value={searchByCountry}
          disabled={searchByCapital}
        />

        <input 
          type="search"
          placeholder='Capital'
          id='searchByCapital'
          className={`border indent-[2px] px-2 py-1 rounded-[2px] border-sky-500 my-2 w-[130px] text-sm ${searchByCountry? "cursor-not-allowed border-none" : ""}`}
          onChange={searchByCapitals}
          value={searchByCapital}
          disabled={searchByCountry}
        />
      </div>

      <div className=''>
        <ul className='grid grid-cols-9 md:gap-2 text-[5.8px] md:text-[10px] text-white w-full bg-sky-500 rounded-[2px] px-4 py-2 mb-1'>
          <li className='text-center'>S/N</li>
          <li className='text-center'>Country</li>
          <li className='text-center'>Capital</li>
          <li className='text-center'>Flag</li>
          <li className='text-center'>Status</li>
          <li className='text-center'>Region</li>
          <li className='text-center'>Official</li>
          <li className='text-center'>Currency Symbol</li>
          <li className='text-center'>Currency Name</li>
        </ul>    

        {renderContent()}
      </div>

      {!isLoading && !error && data.length > 0 && (
        <Pagination
          totalPosts={data.length}
          limit={limit}
          setPage={setPage}
          currentPage={page}
        />
      )}
    </div>
  )
}

export default App