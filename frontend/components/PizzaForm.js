import React, { useState } from 'react'
import { useCreateOrderMutation } from '../state/pizzaOrdersApi'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = '';

    // Validate form fields
    if (!formState.fullName) {
      error = 'Order failed: fullName is required';
    } else if (!formState.size) {
      error = 'Order failed: size must be one of the following values: S, M, L';
    }

    setErrorMessage(error); // Set error message regardless of submission

    try {
      // Set loading state to true when submitting
      setErrorMessage(''); // Clear previous error message

      // Include toppings in the order data
      const orderData = {
        ...formState,
        toppings: Object.keys(formState).filter(key => formState[key] === true) // Collect selected toppings
      };
      await createOrder(orderData).unwrap();
      setFormState(initialFormState);
    } catch (error) {
      console.error('Failed to create order: ', error);
      setErrorMessage(error.data?.message || 'Failed to create order. Please try again.'); // Use API error message if available
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {errorMessage && <div className='failure'>Order Failed: {errorMessage}</div>}
      {/* {isError && <div className='failure'>An error occurred while creating the order.</div>} */}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            data-testid="sizeSelect" 
            id="size" 
            name="size" 
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input 
            data-testid="checkPepperoni" 
            name="1" 
            type="checkbox" 
            checked={formState['1']}
            onChange={handleChange}
          />
          Pepperoni<br /></label>
        <label>
          <input 
            data-testid="checkGreenpeppers" 
            name="2" 
            type="checkbox" 
            checked={formState['2']}
            onChange={handleChange}
          />
          Green Peppers<br /></label>
        <label>
          <input 
            data-testid="checkPineapple" 
            name="3" 
            type="checkbox" 
            checked={formState['3']}
            onChange={handleChange}
          />
          Pineapple<br /></label>
        <label>
          <input 
            data-testid="checkMushrooms" 
            name="4" 
            type="checkbox" 
            checked={formState['4']}
            onChange={handleChange}
          />
          Mushrooms<br /></label>
        <label>
          <input 
            data-testid="checkHam" 
            name="5" 
            type="checkbox" 
            checked={formState['5']}
            onChange={handleChange}
          />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
