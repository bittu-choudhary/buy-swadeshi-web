import React, { Component } from "react"
import * as JsSearch from "js-search"
import { MdCancel } from "react-icons/md"
import { MdCheckCircle } from "react-icons/md"



export default function SearchResultViewer ( props  ) {
  console.log(props.queryResults)
  const queryResults = props.queryResults
  let fontColor = "red"
  let icon = <MdCheckCircle/>
  if (queryResults.length === 0) {
    return <div></div>
  }
  return (<div>
    {/* Number of items:
    {queryResults.length} */}
    <table
      style={{
        marginTop: `1rem`,
        width: `100%`,
        borderCollapse: `collapse`,
        borderRadius: `4px`,
        border: `1px solid #d3d3d3`,
      }}
    >
      <thead style={{ border: `1px solid #808080` }}>
        <tr>
          <th
            style={{
              textAlign: `left`,
              padding: `5px`,
              fontSize: `14px`,
              fontWeight: 600,
              borderBottom: `2px solid #d3d3d3`,
              cursor: `pointer`,
            }}
          >
            Brand Name
          </th>
          <th
            style={{
              textAlign: `left`,
              padding: `5px`,
              fontSize: `14px`,
              fontWeight: 600,
              borderBottom: `2px solid #d3d3d3`,
              cursor: `pointer`,
            }}
          >
            Brand Category
          </th>
          <th
            style={{
              textAlign: `left`,
              padding: `5px`,
              fontSize: `14px`,
              fontWeight: 600,
              borderBottom: `2px solid #d3d3d3`,
              cursor: `pointer`,
            }}
          >
            Is Indian?
          </th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable */}
        {queryResults.map((item, index) => {
          console.log(item.isIndian)
          if (item.isIndian) {
            fontColor = "green"
            icon = <MdCheckCircle/>
          } else {
            fontColor = "red"
            icon = <MdCancel/>
          }
          return (
            <tr  style={{ color: fontColor }} key={`row_${item.name}_${index}`}>
              <td
                style={{
                  fontSize: `14px`,
                  border: `1px solid #d3d3d3`,
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  fontSize: `14px`,
                  border: `1px solid #d3d3d3`,
                }}
              >
                {item.category}
              </td>
              <td
                style={{
                  fontSize: `14px`,
                  border: `1px solid #d3d3d3`,
                }}
              >
                {icon}
              </td>
            </tr>
          )
        })}
        {/* eslint-enable */}
      </tbody>
    </table>
  </div>)
}