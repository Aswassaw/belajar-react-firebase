import React, { useState } from "react";
import { firestoreService } from "../firebase/config";
import Swal from "sweetalert2";

export default function RecipeList({ recipes }) {
  const [detail, setDetail] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const fetchDataById = async (id) => {
    setIsPending(true);

    try {
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
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDataById = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        firestoreService.collection("recipes").doc(id).delete();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
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
                  className='btn btn-sm btn-primary'
                  onClick={() => fetchDataById(recipe.id)}
                >
                  Detail
                </button>
                <button
                  className='btn btn-sm btn-danger ms-2'
                  onClick={() => deleteDataById(recipe.id)}
                >
                  Delete
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
                  <small className='fs-6 fw-bold' key={index}>
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
    </>
  );
}
