import React from 'react'
import "./SchoolTable.css"
export default function SchoolTable({ rows, columns, handleSort }) {

    return rows ? (
        <div className="app">
            <table>
                <tbody>
                    <tr>
                        {columns.map((item, i) => {
                            if (
                                item !== "identification2" &&
                                item !== "identification1" &&
                                item !== " district" &&
                                item !== "latlong                  "

                            ) {
                                return <th key={i}><button className="handle-sort" onClick={() => handleSort(i)}>{item}</button></th>;
                            }
                        })}
                    </tr>
                    {rows.map((item) => {
                        return (
                            <tr>
                                {item.map((innerItem, i) => {
                                    if (i !== 0 && i !== 13 && i !== 14 && i !== 15) {
                                        return <td>{innerItem}</td>;
                                    }
                                })}
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    ) : <div className="loading">Loading</div>;
}
