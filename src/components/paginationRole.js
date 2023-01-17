import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import  '../styles/paginagionRole.css';
import avatar from '../images/avatar.webp'

const fetchRoles=(rolePage)=>{
    return axios.get(`http://localhost:4000/roles?_limit=2&_page=${rolePage}`)
}

export const PaginationRole=()=>{
    const [pageNumber,setPageNumber]=useState(1);
    const { isLoading, isError, error, data, isFetching }=useQuery(
        ['roles',pageNumber],
        ()=>fetchRoles(pageNumber),
        {
            keepPreviousData:true,
        }
    )

    if(isLoading) {
        return <h2>Loading.....</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
          <div className="main-card">
            {data?.data.map(role => {
              return (
                <div key={role.id} className="avatar-card">
                <img src={avatar} alt="User Avatar"/>
                <div className="info">
                  <div className="style-label">User Name: {role.name}</div>
                  <div className="style-label">Role: {role.roleName}</div>
                </div>
              </div>
              )
            })}
              <div className="pagination">
            <button
            className="prev"
              onClick={() => setPageNumber(page => page - 1)}
              disabled={pageNumber === 1}> 
              Prev Page
            </button>
            <button
            className="next"
              onClick={() => setPageNumber(page => page + 1)}
              disabled={pageNumber === 4}>
                Next Page
            </button>
          </div>
          </div>
        

          {isFetching && 'Loading'}
        </>
      )
    
}