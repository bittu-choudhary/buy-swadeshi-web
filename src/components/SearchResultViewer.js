import React from "react"
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
        borderSpacing: `0 5px`,
        marginTop: `1rem`,
        width: `100%`,
        borderRadius: `4px`,
        backgroundColor: `#ff9933`,
      }}
    >
      <thead style={{ border: `1px solid #808080` }}>
        <tr>
          <th
            style={{
              textAlign: `left`,
              padding: `5px`,
              fontSize: `18px`,
              fontWeight: 600,
              cursor: `pointer`,
              borderTopLeftRadius: `5px`,
              borderBottomLeftRadius: `5px`,
              backgroundColor: `#ffffff`,
            }}
          >
            Brand Name
          </th>
          <th
            style={{
              textAlign: `left`,
              padding: `5px`,
              fontSize: `18px`,
              fontWeight: 600,
              cursor: `pointer`,
              backgroundColor: `#ffffff`,
            }}
          >
            Brand Category
          </th>
          <th
            style={{
              textAlign: `center`,
              padding: `5px`,
              fontSize: `18px`,
              fontWeight: 600,
              cursor: `pointer`,
              borderTopRightRadius: `5px`,
              borderBottomRightRadius: `5px`,
              backgroundColor: `#ffffff`,
            }}
          >
            Is Indian?
          </th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable */}
        {queryResults.sort((a, b) => a.isIndian < b.isIndian ? 1 : -1).map((item, index) => {
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
                  fontSize: `18px`,
                  padding: `5px`,
                  borderTopLeftRadius: `5px`,
                  borderBottomLeftRadius: `5px`,
                  backgroundColor: `#ffffff`,
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  fontSize: `18px`,
                  padding: `5px`,
                  backgroundColor: `#ffffff`,
                }}
              >
                {item.category}
              </td>
              <td
                style={{
                  textAlign: `center`,
                  fontSize: `18px`,
                  padding: `5px`,
                  borderTopRightRadius: `5px`,
                  borderBottomRightRadius: `5px`,
                  backgroundColor: `#ffffff`,
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