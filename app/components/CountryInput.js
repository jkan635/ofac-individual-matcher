import React, { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react'
import { countryCodes, getFlagURLByCountryCode } from '../helpers/CountryHelper';

export default function CountryInput({selectedCountry, setSelectedCountry}) {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const countries = Object.keys(countryCodes).map((key) => {
            return {
                countryCode: key,
                countryName: countryCodes[key],
                };
        });
        setCountries(countries);
      }, []);

    useEffect(() => {
        if (query === '') {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter((country) => {
            const countryNameMatch = country.countryName.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''));
            const countryCodeMatch = country.countryCode.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''));
            return countryNameMatch || countryCodeMatch;
            });
            setFilteredCountries(filtered);
        }
    }, [query, countries]);

    return (
        <Combobox value={selectedCountry} onChange={setSelectedCountry}>
            <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                        <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                    </svg>
                </div>
                <Combobox.Input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    displayValue={(country) => (country == null ? '' : country.countryName)}
                    placeholder="Please select a country"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {selectedCountry && (
                        <div className="w-6 h-3 mr-2">
                            <img src={getFlagURLByCountryCode(selectedCountry.countryCode)} alt={`${selectedCountry.countryCode} flag`}/>
                        </div>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </Combobox.Button>
            </div>
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCountries.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option key={country.countryCode} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${active ? 'bg-gray-100' : ''}`} value={country}>
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{country.countryName}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
        </Combobox>
    )
}      