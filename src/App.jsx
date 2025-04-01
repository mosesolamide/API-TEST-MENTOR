import { useState, useEffect } from 'react'
import Body from './Body'
import "./index.css"
import Pagination from './Pagination'
import { LuSearchX } from "react-icons/lu"

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchByCountry,setSearchByCountry] = useState("")
  const [searchByCapital,setSearchByCapital] = useState("")
  const [error,setError] = useState(false)


  const renderData = async () => {
    try{
      let apiUrl = "https://restcountries.com/v3.1/all"
      
      if (searchByCountry) {
        apiUrl = `https://restcountries.com/v3.1/name/${searchByCountry}`
      } else if (searchByCapital) {
        apiUrl = `https://restcountries.com/v3.1/capital/${searchByCapital}`
      }

      const res = await fetch(apiUrl)
      if(!res.ok){
        setError(true)
        throw new Error(res.status === 404 ? "No countries found" : "API error")
      }else{
        setError(false)
      }
      const data = await res.json()
      setData(Array.isArray(data)? data : [])
      
    }catch(err){
        console.error(`Your error fetching data is  ${err}`)
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
  

  useEffect( () =>{
    renderData()
  },[searchByCapital,searchByCountry])

  const lastPostIndex = page * limit /// 1 * 10 = 10
  const firstPostIndex = lastPostIndex - limit // 10 - 10 = 0
  const currentData = data.slice(firstPostIndex,lastPostIndex)

    const body = currentData.map( (country,index) => {
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
          index={firstPostIndex + index + 1}
          key={index}
      />
    })


  return (
    <div className='min-w-[400px]'>
      <div className='flex justify-center gap-2'>
         <input 
            type="search" 
            placeholder='search by country name' 
            id='searchByCountry' 
            className='border indent-[20px] rounded-2xl my-2 w-[200px] text-sm' 
            onChange={search}
         />

        <input type="search"
          placeholder='search by capital'
          id='searchByCapital'
          className='border indent-[20px] rounded-2xl my-2 w-[200px] text-sm'
          onChange={searchByCapitals}
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
      {
        error?
        <div className='flex flex-col justify-center items-center h-[50vh]'>
            <LuSearchX size={100} className='text-gray-400' />
            <p className='text-2xl mt-5'>No Country Found</p>
        </div> : 
        body 
       }
    </div>
          <Pagination
          totalPosts={data.length}
          limit={limit}
          setPage={setPage}
          currentPage={page}
      />
    </div>
  )
}

export default App