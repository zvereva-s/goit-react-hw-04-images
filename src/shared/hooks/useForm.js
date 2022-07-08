import {useState} from "react";

export function useForm({ onSubmit, initialStateForm, isReset }){
  const [formState, setForm] = useState({ ...initialStateForm });

  function handleChange({ target }){
    const { name, value } = target;
    setForm({
      [name]: value,
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    onSubmit({ ...formState });

    if (isReset) {
      resetForm();
    }
    
  };

  function resetForm(){
    setForm({ ...initialStateForm });
  };
    
  return { formState, setForm, handleChange, handleSubmit, resetForm, isReset };
};

useForm.defaultProps = {
  isReset: true,
}