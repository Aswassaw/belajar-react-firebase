import React from "react";

export default function RecipeList({ recipes }) {
  return (
    <div>
      <h1>Recipe List</h1>
      <div className='row'>
        {recipes.map((recipe) => (
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 my-2'>
            <div className='card h-100'>
              <div className='card-body'>
                <p className='fw-bold fs-5 mb-0'>{recipe.title}</p>
                <p className='text-secondary'>
                  Cooking Time: {recipe.cookingTime} detik
                </p>
                <button className='btn btn-primary'>Detail</button>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}
