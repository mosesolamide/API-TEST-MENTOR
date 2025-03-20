import React from "react"


export default function Pagination({totalPosts,postsPerPage,setCurrentPage}){
    let pages = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pages.push(i)
    }
    return(
        <div>
            {pages.map((page,index)=> {
                return <button
                    key={index}
                    className="bg-sky-500 w-7 mr-1 mb-1 rounded text-white cursor-pointer hover:bg-sky-600"
                    onClick={ () => setCurrentPage(page)}
                 >
                    {page}
                </button>
            })}
        </div>
    )
}