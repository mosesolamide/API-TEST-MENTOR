import { useState, useEffect } from 'react'
import Body from './Body'
import "./index.css"
import Pagination from './Pagination'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect( () =>{
    const renderData = async () => {
      try{
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json()
        setData(data)
      }catch(err){
          console.error(`Your error fetching data is  ${err}`)
      }
    }
    renderData()
  },[])

  const lastPostIndex = page * limit /// 1 * 10 = 10
  const firstPostIndex = lastPostIndex - limit // 10 - 10 = 0
  const currentData = data.slice(firstPostIndex,lastPostIndex)

  // const next = () =>{
  //   if(secondValue < data.length){
  //     setFirstValue( prev => prev + 10)
  //     setSecondValue( prev => prev + 10)
  //   }
  // }

  // const back = () => {
  //   if(firstValue > 0 ){
  //     setFirstValue( prev => prev - 10)
  //     setSecondValue( prev => prev - 10)
  //   }
  // }


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
      <h1></h1>
    <div className=''>
      <ul className='grid grid-cols-9 md:gap-2 text-[5.8px] md:text-[10px] text-white w-full bg-sky-500 rounded-[2px] px-4 py-2 mb-2'>
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
      {body}
    </div>
          <Pagination
          totalPosts={data.length}
          limit={limit}
          setPage={setPage}
          currentPage={page}  // Add this line
      />
    </div>
  )
}

export default App

// flags.png or .svg ,