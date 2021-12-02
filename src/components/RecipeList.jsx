import React, { useState } from "react";
import { firestoreService } from "../firebase/config";

export default function RecipeList({ recipes }) {
  const [detail, setDetail] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const fetchDataById = async (id) => {
    setIsPending(true);

    const doc = await firestoreService.collection("recipes").doc(id).get();
    if (doc.exists) {
      setError(null);
      setDetail(doc.data());
      setIsPending(false);
    } else {
      setError("Could not find the recipe");
      setDetail(null);
      setIsPending(false);
    }
  };

  return (
    <div>
      <h1>Recipe List</h1>
      <div className='row'>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className='col-12 col-sm-6 col-md-4 col-lg-3 my-2'
          >
            <div className='card h-100'>
              <div className='card-body'>
                <p className='fw-bold fs-5 mb-0'>{recipe.title}</p>
                <p className='text-secondary'>
                  Cooking Time: {recipe.cookingTime} detik
                </p>
                <button
                  className='btn btn-primary'
                  onClick={() => fetchDataById(recipe.id)}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {detail && (
        <div className='card'>
          <div className='card-body'>
            <h1 className='mb-0'>{detail.title}</h1>
            <p className='text-secondary'>
              Cooking Time: {detail.cookingTime} detik
            </p>
            <p>
              Bahan:{" "}
              {detail.ingredients.map((ingredient, index) => {
                return (
                  <small className='fs-6' key={index}>
                    {ingredient}
                    {index !== detail.ingredients.length - 1 ? "," : "."}{" "}
                  </small>
                );
              })}
            </p>
            <p>{detail.method}</p>
          </div>
        </div>
      )}
    </div>
  );
}
