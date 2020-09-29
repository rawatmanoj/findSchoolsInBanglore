import React, { useEffect, useState, useRef } from "react";
import { readRemoteFile } from "react-papaparse";
import SchoolTable from "./SchoolTable";
import { useForm } from "react-hook-form";

import "./ParseCsv.css";
export default function () {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const ref = useRef({
    defaultRow: 0,
  });
  const { register, handleSubmit, errors } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm();

  useEffect(() => {
    async function getData() {
      readRemoteFile(
        "https://raw.githubusercontent.com/openbangalore/bangalore/master/bangalore/Education/Bangalore_schools.csv",
        {
          delimiter: "|",
          download: true,
          complete: (results) => {
            setColumns(results.data[0]);
            ref.current.defaultRow = results.data.slice(2, results.length);
            setRows(results.data.slice(2, results.length));
          },
        }
      );
    }
    getData();
  }, []); // [] means just do this once, after initial render
  // console.log(rows);
  const serachItem = (search) => {
    const newArr = [];

    rows.filter((item) => {
      if (
        item[4] === search ||
        item[8] === search ||
        item[9] === search ||
        item[10] === search ||
        item[11] === search
      ) {
        return newArr.push(item);
      }
      return newArr;
    });
    console.log(newArr);
    setRows(newArr);
  };
  const onSubmit = (data) => {
    serachItem(data.result);
  };

  const handleSort = (index) => {
    let sortedArray = rows.sort((a, b) => {
      if (a[index] < b[index]) return -1;
      if (a[index] > b[index]) return 1;

      return 0;
    });
    //  curRef.current = sortedArray;
    setRows([...sortedArray]);
    console.log(rows);
  };

  const handleOnchange = (data) => {
    // console.log(data.target.value);
    if (!data.target.value) {
      console.log("yes");
      setRows([...ref.current.defaultRow]);
    }
  };

  const onFilter = ({ category, medium, gender }) => {
    console.log(category, medium, gender);
    const newArr = [];
    rows.filter((item) => {
      if (
        item[5] === category &&
        item[7] === (medium || item[7]) &&
        item[6] === (gender || item[6])
      ) {
        return newArr.push(item);
      }
      return newArr;
    });
    setRows(newArr);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="container">
      <div className="heading">Schools in Bangalore</div>
      <div className="search-school">
        <form key={1} className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="search-input"
            name="result"
            placeholder="search"
            onChange={handleOnchange}
            ref={register({ required: true, maxLength: 300 })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <input className="search-submit" onSubmit={onSubmit} type="submit" />
          <button onClick={refreshPage} className="search-submit">
            Reset
          </button>
        </form>
      </div>
      <div className="filter-heading">Filters</div>
      <div className="filter-container">
        <form
          key={2}
          className="form-filter"
          onSubmit={handleSubmit2(onFilter)}
        >
          <input
            className="search-filter"
            name="category"
            placeholder="category"
            ref={register2({ required: false, maxLength: 300 })}
          />
          <input
            className="search-filter"
            name="gender"
            placeholder="gender"
            ref={register2({ required: false, maxLength: 300 })}
          />
          <input
            className="search-filter"
            name="medium"
            placeholder="medium"
            ref={register2({ required: false, maxLength: 300 })}
          />
          {errors2.exampleRequired && <p>This field is required</p>}

          <input className="filter-submit" onSubmit={onSubmit} type="submit" />
        </form>
      </div>

      <SchoolTable rows={rows} columns={columns} handleSort={handleSort} />
    </div>
  );
}
