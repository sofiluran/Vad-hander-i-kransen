'use client'

import { searchEvents, SearchEventsType } from "@/lib/supabase/queries"
import { SetStateAction, useState } from "react"
import Link from "next/link"

const Search = () => {
  const [input, setinput] = useState<string>('')
  const [searchResults, setSearchResult] = useState<SearchEventsType | null>(null)

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setinput(e.target.value)
  }

  const handleClick = async () => {
    const { data, error } = await searchEvents(input)
    if (error) throw new Error
    setSearchResult(data)
  }

  const resetSearch = () => {
    setSearchResult(null),
    setinput('')
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <input
          className="w-full px-3 py-2 text-sm bg-white border border-surface/80 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          onChange={handleChange}
          placeholder="Sök efter event"
          value={input} />
        <button
          onClick={handleClick}
          className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer">
          Sök
        </button>
      </div>
      {searchResults &&
        <div className="absolute top-full left-0 right-0 mt-2 z-50 flex flex-col gap-1 p-2 bg-background border border-surface rounded-2xl shadow-xl max-h-80 overflow-y-auto">
          {searchResults.map((result, index) =>
            <Link
              className="px-3 py-2 text-sm text-text hover:text-primary hover:bg-surface/60 rounded-xl transition-colors font-medium truncate block"
              key={index}
              href={`/${result.slug}`}
              onClick={resetSearch}>
              {result.title}
            </Link>)}
        </div>}
    </div>
  )


}

export default Search