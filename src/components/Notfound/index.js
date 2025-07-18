import './index.css'

import {Link} from 'react-router-dom'
import Header from '../Header'

const Notfound = () => (
  <Link to="not-found">
    <Header />
    <div className="notfound-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </Link>
)
export default Notfound
