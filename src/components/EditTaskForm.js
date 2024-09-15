import React from 'react';
import useEditTaskForm from '../hooks/useEditTaskForm';

const EditTaskForm = ({ task, onSubmit }) => {
  const { editingTask, handleChange, handleReset } = useEditTaskForm(task);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(editingTask);
    handleReset();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Título:</label>
          <input
            type="text"
            id="editTitle"
            name="title"
            value={editingTask.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            id="editDescription"
            name="description"
            value={editingTask.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editCompleted" className="block text-sm font-medium text-gray-700">Completada:</label>
          <input
            type="checkbox"
            id="editCompleted"
            name="completed"
            checked={editingTask.completed}
            onChange={handleChange}
            className="mr-2"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;