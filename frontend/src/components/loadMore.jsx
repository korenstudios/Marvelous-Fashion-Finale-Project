import { useContext } from "react";
import { GlobalState } from "./common/globalState";

const LoadMore = () => {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsApi.page;
  const [result] = state.productsApi.result;

  const handleLoadMore = () => setPage(page + 1);

  return (
    <div className="load-more">
      {result < page * 8 ? (
        ""
      ) : (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default LoadMore;
