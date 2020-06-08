import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useOutsideClick from "../HelperFunctions/useOutsideClick";

const SearchButton = styled.div`
  position: relative;
  display: inline-block;
`;

interface DisplayCountriesBoolean {
  displayCountries: string;
}

const DropdownCountries = styled.div<DisplayCountriesBoolean>`
  .dropdown-content {
    display: ${(props) => props.displayCountries || "none"};

    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    border: 1px solid #ddd;
    z-index: 1;
    left: 0;
    height: 500px;
    overflow: -moz-scrollbars-vertical;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }
  }
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
`;

interface OwnState {
  searchTerm: string;
  displayCountries: string;
  node: HTMLInputElement;
  countries: Array<string>;
  filteredCountries: Array<string>;
}

const CountrySearch: React.FC<OwnState> = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Array<string>>([]);
  const [filteredCountries, setFilteredCountries] = useState<Array<string>>([]);
  const [displayCountries, setDisplayCountries] = useState("none");
  const [open, setOpen] = useState(false);

  const node = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  useOutsideClick(node, () => {
    console.log("you clicked outside");
    setOpen(false);
  });

  useEffect(() => {
    (async function loadCountriesData() {
      try {
        const response = await fetch("/countries");
        let countriesLoaded: Array<string> = [];
        const countriesData = await response.json();
        for (let i = 0; i < countriesData.length; i++) {
          countriesLoaded.push(countriesData[i].Name);
        }
        setCountries(countriesLoaded);
        setFilteredCountries(countriesLoaded);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let currentCountryList = [];
    let newCountryList = [];
    if (e.currentTarget.value !== "") {
      currentCountryList = countries;
      newCountryList = currentCountryList.filter((item: string) => {
        const lc = item.toLowerCase();
        const filter = e.currentTarget.value.toLowerCase();
        console.log(filter, "this is filter");
        console.log(lc, "this is lc");
        return lc.includes(filter);
      });
    } else {
      newCountryList = countries;
    }
    setFilteredCountries(newCountryList);
  };

  const dropDownCountries = () => {
    setDisplayCountries("inline");
    setOpen(true);
  };

  return (
    <form>
      <SearchButton>
        <div ref={node}>
          <button>Search</button>
          <input
            type="search"
            onClick={dropDownCountries}
            onChange={handleChange}
          />
          {open && (
            <DropdownCountries displayCountries={displayCountries}>
              <div className="dropdown-content">
                {filteredCountries.map((item) => (
                  <Link
                    to={`/${item}`}
                    href={`#${item}`}
                    key={item}
                    // onClick={onCountryClick}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </DropdownCountries>
          )}
        </div>
      </SearchButton>
    </form>
  );
};

export default CountrySearch;
