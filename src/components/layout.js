import React from "react"
import { withTrans } from '../i18n/withTrans'
import Footer from './footer'
import Header from './header'

// Menu = (props) => {
//   return(
//     <table>
//       <tbody>
//         <tr>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }


const Layout =  ( {children}) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default withTrans(Layout)