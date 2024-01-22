import React from 'react';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="firstName" {...register('firstName',{ required: true })} />
      {errors.firstName && <span>First name is required.</span>}

      <input type="text" name="lastName" {...register("lastName",{ required: true })} />
      {errors.lastName && <span>Last name is required.</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;