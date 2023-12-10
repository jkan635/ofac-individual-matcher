"use client";
import React, { useState, useEffect } from 'react';
import CountryInput from './components/CountryInput';
import NameInput from './components/NameInput';
import DateInput from './components/DateInput';
import Button from './components/Button';
import { postIndividualScreen } from './helpers/Api';
import LoadingIndicator from './components/LoadingIndicator';
import { Country } from './models/Country';
import { formatDate } from './helpers/DateHelper';

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [dobString, setDobString] = useState<string | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [nameMatched, setNameMatched] = useState(false);
  const [dobMatched, setDobMatched] = useState(false);
  const [countryMatched, setCountryMatched] = useState(false);


  useEffect(() => {
    // setValidated(true)
      setValidated(Boolean(name) && Boolean(dobString) && Boolean(country))
  }, [name, dobString, country]);

  const onButtonClick = async () => {
    setIsLoading(true);
    setHasResponse(false);
    setHasError(false);
    const resp = await postIndividualScreen(name, dobString, country?.countryName);
    // const resp = await postIndividualScreen("Abu Abbas", "1996-09-07", "Canada");
    const json = await resp.json();

    if (!json || !json.matches) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setHasResponse(true);
    let matches = json.matches;
    
    for (let i=0; i<matches.length; i++) {
      const match = matches[i];
      const normalizedName = match.fullName.toLowerCase();
      if (normalizedName == (name ?? "").toLowerCase()) {
        setNameMatched(true);
      }
      const matchDob = new Date(match.dob);
      if (formatDate(matchDob) == dobString) {
        setDobMatched(true);
      }
      const citizenships = match.citizenship;
      for (let j=0; j<citizenships.length; j++) {
        const citizenship = citizenships[j];
        if (citizenship == country?.countryName) {
          setCountryMatched(true);
        }
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 min-h-screen flex justify-center">
      <div className="flex flex-col items-center max-w-2xl w-full m-4 p-4 bg-white rounded-md">
        <div className="flex flex-col w-full items-center">

          <div className="flex flex-col w-10/12">
            <div className="mt-8 text-2xl font-bold text-center text-gray-800">OFAC Individual Matcher</div>
            <div className="text-sm font-medium text-center text-gray-400">Enter a name, date of birth, and country to screen a individual against the publicly available OFAC Specially Designated Nationals (SDN) list</div>
          </div>

          <div className="mt-10 flex flex-col gap-4 w-2/3">
            <NameInput value={name} setValue={setName} />
            <DateInput value={dobString} setValue={setDobString} />
            <CountryInput selectedCountry={country} setSelectedCountry={setCountry} />
          </div>

          <div className="mt-10 w-2/3">
            <Button isLoading={isLoading} isDisabled={!validated} onClick={() => onButtonClick()}>
                Submit
            </Button>
          </div>

          {isLoading && 
            <div className="mt-14">
              <LoadingIndicator />
            </div>
          }

          {hasResponse && 
            <div className="mt-14 flex flex-col gap-4 w-1/2">
              <div className="text-base font-medium text-center text-gray-400">{nameMatched || dobMatched || countryMatched ? 'Hit' : 'Clear'}</div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-sm font-medium text-left text-gray-400">Name: {name}</div>
                <div className="text-sm font-medium text-right text-gray-400">{nameMatched ? "✅" : "❌" }</div>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-sm font-medium text-left text-gray-400">Date of Birth: {dobString}</div>
                <div className="text-sm font-medium text-right text-gray-400">{dobMatched ? "✅" : "❌" }</div>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="text-sm font-medium text-left text-gray-400">Country: {country?.countryName}</div>
                <div className="text-sm font-medium text-right text-gray-400">{countryMatched ? "✅" : "❌" }</div>
              </div>
            </div>
          }
          {hasError && 
            <div className="mt-14 flex flex-col gap-4 w-1/2">
                <div className="text-sm font-medium text-center text-gray-400">There was an error find a match</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
