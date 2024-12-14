import { useState, useEffect } from 'react';
import { Food } from '../types';
import { getFoods } from '../services/api';

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getFoods();
        setFoods(response.data);
      } catch (err) {
        setError('Failed to fetch foods');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return { foods, loading, error };
}