// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetPuppiesQuery } from '../../store/api';
/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  const { data = {}, isLoading, refetch } = useGetPuppiesQuery();
  if (data) {
    console.log(data);
  }
  // const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <article>
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
              </article>
            </li>
          ))}
      </ul>
    </article>
  );
}
