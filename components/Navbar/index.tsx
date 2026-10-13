'use client'

import { useState } from "react"
import Search from "../Header/search"

const Navigation = ({ accountlinks }: { accountlinks: React.ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div>
      <button onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? "X" : "="}
      </button>

      {showMenu && (
        <div className="p-4">

          <div>
            <Search />
          </div>
          <div>
            {accountlinks}
          </div>

        </div>
      )
      }
    </div>
  )
}

export default Navigation