import "./App.css";

import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setcount] = useState(0);

  useEffect(() => {
    const apiCallFunction = async () => {
      const apiData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${5}&_page=${pageNumber}`
      );
      const apiDataJson = await apiData.json();
      console.log({ apiDataJson });

      const dataArrayCopy = [...apiDataJson];

      setDataArray(dataArrayCopy);
    };

    apiCallFunction();
  }, [pageNumber]);

  const MAX_PAGE_NUMBER = 20;
  const pageNumberArray = new Array(20).fill(1).map((_, idx) => idx + 1);
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
