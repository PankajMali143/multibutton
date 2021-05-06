import "./App.css";

import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(pageNumber);
  const LIMIT = 5;

  //let apiData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const paginatedData = (page, limit) => {
    const firstItem = page * limit - limit;
    const lastItem = page * limit;
    return dataArray.slice(firstItem, lastItem);
  };
  useEffect(() => {
    const apiCallFunction = async () => {
      const apiData = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const apiDatajson = await apiData.json();
      const dataArrayCopy = [...apiDatajson];
      setDataArray(dataArrayCopy);
    };

    apiCallFunction();
  }, []);

  const paginatedDataArray = paginatedData(pageNumber, LIMIT);
  console.log(paginatedDataArray);

  const MAX_PAGE_NUMBER = Math.ceil(dataArray.length / LIMIT);
  const pageNumberArray = new Array(MAX_PAGE_NUMBER)
    .fill(1)
    .map((_, idx) => idx + 1);
  console.log(pageNumberArray);

  console.log("paginated" + Math.ceil(paginatedDataArray.length / LIMIT));
  const handleNext = () => {
    setPageNumber(
      pageNumber >= Math.ceil(dataArray.length / LIMIT)
        ? pageNumber
        : pageNumber + 1
    );
  };

  const handleBack = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };

  return (
    <div className="App">
      <ul>
        {paginatedDataArray.map((data, idx) => (
          <li className="data" key={idx}>
            {data.id}
          </li>
        ))}
      </ul>

      <div>
        <button disabled={pageNumber === 1} onClick={handleBack}>
          Back
        </button>
        <button
          disabled={pageNumber === Math.ceil(dataArray.length / LIMIT)}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="multibuttons">
        {pageNumberArray.map((item, idx) => (
          <button key={idx} onClick={() => setPageNumber(idx + 1)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
