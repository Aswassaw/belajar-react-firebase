import React, { useState } from "react";
import { firestoreService } from "../firebase/config";

export default function AddRecipe({ refresh }) {
  const [formData, setFormData] = useState({
    title: "",
    cookingTime: "",
    ingredients: "",
    method: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const doc = {
      ...formData,
      cookingTime: parseInt(formData.cookingTime),
      ingredients: formData.ingredients.trim().split(","),
    };

    try {
      await firestoreService.collection("recipes").add(doc);
      setFormData({
        title: "",
        cookingTime: "",
        ingredients: "",
        method: "",
      });
      setLoading(false);
      refresh();

      document.getElementById("closeAddRecipe").click();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className='modal fade'
      id='addRecipe'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdropLabel'>
              Add Recipe
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={onSubmitHandler}>
              <div className='mb-3'>
                <label htmlFor='floatingInput'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  placeholder='Soto Ayam'
                  value={formData.title}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='floatingInput'>Cooking Time</label>
                <input
                  type='number'
                  className='form-control'
                  id='cookingTime'
                  name='cookingTime'
                  placeholder='2500'
                  value={formData.cookingTime}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='floatingInput'>Ingredients</label>
                <input
                  type='text'
                  className='form-control'
                  id='ingredients'
                  name='ingredients'
                  placeholder='wortel, royco, bambang'
                  value={formData.ingredients}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='floatingInput'>Method</label>
                <input
                  type='text'
                  className='form-control'
                  id='method'
                  name='method'
                  placeholder='blah blah blah'
                  value={formData.method}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              {loading ? (
                <button className='btn btn-success' type='button' disabled>
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                  ></span>
                  Loading...
                </button>
              ) : (
                <button className='btn btn-success'>Submit</button>
              )}
            </form>
          </div>
          <div className='modal-footer'>
            <button
              id='closeAddRecipe'
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
