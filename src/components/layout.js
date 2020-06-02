import React from "react"
import { BsHeartFill } from "react-icons/bs"
import IndiaFLagImg from '../images/india-flag-16.png'
import { withTrans } from '../i18n/withTrans'
import { useTranslation } from "react-i18next"
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
  const { t, i18n } = useTranslation()
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default withTrans(Layout)