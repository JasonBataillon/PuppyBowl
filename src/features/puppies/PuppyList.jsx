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
  const { data = {}, isLoading, error, refetch } = useGetPuppiesQuery();

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
        {data.data &&
          data.data.players.map((p) => (
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
