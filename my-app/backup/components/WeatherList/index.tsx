import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";


const WeatherList: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Weather[]>([]);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    const filteredResults = weatherData.filter((city) => {
      if(city.city.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)){
        return true;
      }else{
        return false;
      }
    });
    setSearchResults(filteredResults);
  };

  const handleClearSearch = () => { 
    setSearchInput('');
    setSearchResults([]);
  };

  const handleUnitChange = () => { 
    setTemperatureUnit(unit => (unit === 'C' ? 'F' : 'C'));
  };

  const handleAddFavorite = (cityId: number) => {
    setFavorites(prevFavorites => [...prevFavorites, cityId]);
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(id => id !== cityId));
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            value={searchInput}
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            searchResults.map(city => (
              <WeatherCard
                key={city.id}
                weather={city}
                unit={temperatureUnit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={favorites.includes(city.id)}
              />
            ))
          }
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to { temperatureUnit === 'F' ? 'Celsius' : 'Fahrenheit' }
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {weatherData
            .filter(city => favorites.includes(city.id))
            .map(city => (
              <WeatherCard
                key={city.id}
                weather={city}
                unit={temperatureUnit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={true}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
