'use client'

import { ReactNode, useState } from "react"
import Search from "../Header/search"


interface NavProps {
  accountlinks: ReactNode;
}


const Navigation = ({accountlinks}: NavProps) => {
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
            {accountlinks}
          </div>

        </div>
      )
      }
    </div>
  )
}

export default Navigation