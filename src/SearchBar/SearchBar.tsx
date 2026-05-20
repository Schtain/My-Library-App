import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { useDebounce } from "../hooks";

interface SearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Try to find..."
      value={searchInput ? searchInput : ""}
      onChange={(e) => handleInput(e)}
    />
  );
}
