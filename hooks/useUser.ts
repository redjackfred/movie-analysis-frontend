import { useState, useEffect } from 'react';
import getRatings from '../utils/getRatings'

export function useUser(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const imdbId = "tt1201607";
  const title = "Harry Potter and the Deathly Hallows: Part 2";
  
  useEffect(() => {
    getRatings(imdbId, title).then(response => {
      setUser(response);
      setLoading(false);
    });
  }, [userId]);

  return { user, loading };
}