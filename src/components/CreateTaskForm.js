import React from 'react';
import useCreateTaskForm from '../hooks/useCreateForm';

const CreateTaskForm = ({ onSubmit }) => {
  const { newTask, handleChange, handleReset } = useCreateTaskForm();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTask);
    handleReset();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Título:</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;