import React from 'react';

const TaskItem = ({ task, onEditClick, onDeleteClick, onCheckboxChange }) => (
  <li key={task.id} className="mb-4 flex items-start">
    <div className="flex-1">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onCheckboxChange(task.id, !task.completed)}
        className="mr-2"
      />
      <span className={`text-lg ${task.completed ? 'line-through' : ''}`}>
        {task.title}
      </span>
      <p className="text-gray-600 text-sm mt-1">
        {task.description}
      </p>
    </div>
    <button
      onClick={() => onEditClick(task)}
      className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      Editar
    </button>
    <button
      onClick={() => onDeleteClick(task.id)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
    >
      Eliminar
    </button>
  </li>
);

export default TaskItem;
