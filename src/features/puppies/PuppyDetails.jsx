import { useEffect } from 'react';
import { useGetPuppyQuery, useDeletePuppyMutation } from './puppySlice';
/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const [deletePuppy] = useDeletePuppyMutation();
  const { data, isLoading, refetch } = useGetPuppyQuery(selectedPuppyId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // TODO: Grab data from the `getPuppy` query

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked

  function removePuppy(id) {
    setSelectedPuppyId();
    deletePuppy(id);
  }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    console.log(data);
    const player = data.data.player;
    $details = (
      <>
        <h3>{player.name}</h3>
        <p>{player.breed}</p>
        <p>Team {player.team?.name ?? 'Unassigned'}</p>
        <button onClick={() => removePuppy(player.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={player.imageUrl} alt={player.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
