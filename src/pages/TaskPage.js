import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import instance from '../services/axios';


export const TasksPage = () => {

  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState([]);

  const [modifiedTasks, setModifiedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await instance.get('/task/list');
        const sortedTasks = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setTasks(sortedTasks);
      } catch (err) {
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/task/create', newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '' });
      toast.success('Tarea Agregada!');

    } catch (err) {
      toast.error('Ups! Algo salió mal, intente nuevamente');
    }
  };

  const handleTaskStateChange = (taskId, completed) => {
    const originalTask = tasks.find(task => task.id === taskId);
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed } : task));

    if (originalTask.completed !== completed) {
      setModifiedTasks(prev => {
        const alreadyModified = prev.find(task => task.id === taskId);
        if (alreadyModified) {
          return prev.map(task => task.id === taskId ? { ...task, completed } : task);
        } else {
          return [...prev, { id: taskId, completed }];
        }
      });
    } else {
      setModifiedTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };
  const handleSaveChanges = async () => {
    try {
      await instance.patch('/task/update-state', { tasks: modifiedTasks });
      setModifiedTasks([]);
      toast.success('Cambios Aplicados!');
    } catch (err) {
      toast.error('Ups! Algo salió mal durante la actualización, intente nuevamente');
    }
  };
  const handleDeleteAllTasks = async () => {
    try {
      await instance.delete('/task/delete-all');
      setTasks([]);
      toast.success('Todas las tareas han sido eliminadas');
    } catch (err) {
      toast.error('Ups! Algo salió mal durante la eliminación, intente nuevamente');
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await instance.delete(`/task/delete/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success('Tarea eliminada!');
    } catch (err) {
      toast.error('Ups! Algo salió mal durante la eliminación, intente nuevamente');
    }
  };
  const handleEditClick = (task) => {
    setEditingTask(task);
  };
  const handleEditTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/task/edit/${editingTask.id}/`, {
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
      });
      setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
      setEditingTask(null);
      toast.success('Tarea modificada con exito!');
    } catch (err) {
      toast.error('Ups! Algo salió mal durante la actualización, intente nuevamente');

    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-8 bg-gray-100 border-r overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lista de Tareas</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleSaveChanges}
              className={`bg-green-500 text-white px-4 py-2 rounded ${modifiedTasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={modifiedTasks.length === 0}
            >
              Guardar Cambios
            </button>
            <button
              onClick={handleDeleteAllTasks}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar Todas las Tareas
            </button>
          </div>
        </div>
        <ul>
          {tasks.length === 0 ? (
            <li className="text-gray-500">No hay tareas</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="mb-4 flex items-start">
                <div className="flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskStateChange(task.id, !task.completed)}
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
                  onClick={() => handleEditClick(task)}
                  className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="w-1/2 p-8 flex flex-col">
        <div className="mt-8 border-t pt-8">
          {editingTask && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Editar Tarea</h2>
              <form onSubmit={handleEditTaskSubmit}>
                <div className="mb-4">
                  <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Título:</label>
                  <input
                    type="text"
                    id="editTitle"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">Descripción:</label>
                  <textarea
                    id="editDescription"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="editCompleted" className="block text-sm font-medium text-gray-700">Completada:</label>
                  <input
                    type="checkbox"
                    id="editCompleted"
                    checked={editingTask.completed}
                    onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
                    className="mr-2"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h2>
          <form onSubmit={handleCreateTask}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Título:</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Descripción:</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Crear
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};