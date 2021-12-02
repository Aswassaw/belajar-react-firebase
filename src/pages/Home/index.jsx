import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import { firestoreService } from "../../firebase/config";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    firestoreService
      .collection("recipes")
      .get()
      .then((snapshot) => {
        // Jika snapshot empty
        if (snapshot.empty) {
          setError("No recipes to load");
          setData(null);
          setIsPending(false);
        }

        // Jika snapshot tidak empty
        else {
          let results = [];
          snapshot.docs.forEach((doc) =>
            results.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          setError(false);
          setData(results);
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
        setIsPending(false);
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
