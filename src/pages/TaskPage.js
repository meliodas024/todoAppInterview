import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import CreateTaskForm from '../components/CreateTaskForm';
import EditTaskForm from '../components/EditTaskForm';

export const TasksPage = () => {
  const {
    tasks,
    modifiedTasks,
    createTask,
    updateTask,
    deleteTaskById,
    deleteAllTasks,
    saveChanges,
    handleTaskStateChange
  } = useTasks();

  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = async (newTask) => {
    await createTask(newTask);
  };

  const handleEditTaskSubmit = async (updatedTask) => {
    if (updatedTask) {
      await updateTask(updatedTask);
      setEditingTask(null);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-8 bg-gray-100 border-r overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lista de Tareas</h2>
          <div className="flex space-x-2">
            <button
              onClick={async () => await saveChanges()}
              className={`bg-green-500 text-white px-4 py-2 rounded ${modifiedTasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={modifiedTasks.length === 0}
            >
              Guardar Cambios
            </button>
            <button
              onClick={async () => await deleteAllTasks()}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${tasks.length === 0 ? 'opacity-50 cursor-not-allowed': ''}`}
              disabled={tasks.length === 0}
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
              <TaskItem
                key={task.id}
                task={task}
                onEditClick={setEditingTask}
                onDeleteClick={async (id) => await deleteTaskById(id)}
                onCheckboxChange={handleTaskStateChange}
              />
            ))
          )}
        </ul>
      </div>

      <div className="w-1/2 p-8 flex flex-col">
        <div className="mt-8 border-t pt-8">
          {editingTask ? (
            <EditTaskForm
              task={editingTask}
              onSubmit={handleEditTaskSubmit}
            />
          ) : (
            <CreateTaskForm
              onSubmit={handleCreateTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};
