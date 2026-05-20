import { useState, type Dispatch, type SetStateAction } from "react";

interface SearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
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
