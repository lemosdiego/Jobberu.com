"use client";
import { createContext, useContext } from "react";

const SearchFilterContext = createContext();

export function SearchFilterProvider({ children }) {
  return (
    <SearchFilterContext.Provider value={{}}>
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  return useContext(SearchFilterContext);
}
