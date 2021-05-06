import "./App.css";

import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const apiCallFunction = async () => {
      console.log("pageNumber" + pageNumber);
      const apiData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${5}&_page=${pageNumber}`
      );
      const apiDataJson = await apiData.json();
      console.log("json data foramt" + { apiDataJson });

      const dataArrayCopy = [...apiDataJson];

      setDataArray(dataArrayCopy);
    };

    apiCallFunction();
  }, [pageNumber]);

  let apiData = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    "D",
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0
  ];
  const paginatedData = (page, limit) => {
    const firstItem = page * limit - limit;
    const lastItem = page * limit;
    return apiData.slice(firstItem, lastItem);
  };

  console.log(paginatedData(3, 5));

  const MAX_PAGE_NUMBER = 20;
  const pageNumberArray = new Array(MAX_PAGE_NUMBER)
    .fill(1)
    .map((_, idx) => idx + 1);
  console.log(pageNumberArray);

  const handleNext = () => {
    setPageNumber(pageNumber >= 20 ? pageNumber : pageNumber + 1);
  };

  const handleBack = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };

  return (
    <div className="App">
      <ul>
        {dataArray.map((data, idx) => (
          <li className="data" key={idx}>
            {data.id}
          </li>
        ))}
      </ul>

      <div>
        <button disabled={pageNumber === 1} onClick={handleBack}>
          Back
        </button>
        <button disabled={pageNumber === 20} onClick={handleNext}>
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
