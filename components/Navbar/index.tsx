'use client'

import { useState } from "react"
import Search from "../Header/search"
import AccountLinks from "../Header/accountLinks";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div>
      <button onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? "X" : "="}
      </button>

      {showMenu && (
        <div>

          <div>
          <Search />
          </div>
          <div>
            <AccountLinks />
          </div>

        </div>
      )
      }
    </div>
  )
}

export default Navigation