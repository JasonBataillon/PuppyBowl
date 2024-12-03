// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetPuppiesQuery } from './puppySlice';
/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  const [searchQuery, setSearchQuery] = useState('');
  // TODO: Get data from getPuppies query
  const { data, isLoading, error, refetch } = useGetPuppiesQuery();
  const [filteredPuppies, setFilteredPuppies] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const puppies = data.data.players;

    /**
     * take the user input and filter the players based on whats typed out
     */
    const result = puppies.filter((puppy) => {
      if (puppy.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      return false;
    });

    setFilteredPuppies(result);
  }, [searchQuery, data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <article>
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search puppies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {filteredPuppies.map((p) => (
          <li key={p.id}>
            <h3>Name: {p.name}</h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <article>
              <h4>Breed: {p.breed}</h4>
              <h4>Status: {p.status}</h4>
              <button onClick={() => setSelectedPuppyId(p.id)}>
                View Puppy
              </button>
              {isLoading && <output>Uploading puppy information...</output>}
              {error && <output>{error.message}</output>}
            </article>
          </li>
        ))}
      </ul>
    </article>
  );
}
