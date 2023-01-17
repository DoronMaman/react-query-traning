import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import  '../styles/paginagionRole.css';
import avatar from '../images/avatar.webp'

const fetchRoles = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/roles?_limit=2&_page=${pageParam}`);
};
export const LoadingMore = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["roles"], fetchRoles, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="div-main-load-more">
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((role) => (
              <div key={role.id} className="avatar-card">
              <img src={avatar} alt="User Avatar"/>
              <div className="info">
                <div className="style-label">User Name: {role.name}</div>
                <div className="style-label">Role: {role.roleName}</div>
              </div>
            </div>
              ))}
            </Fragment>
          );
        })}
         <div className="pagination">
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      </div>
     
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
