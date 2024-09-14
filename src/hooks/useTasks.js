import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import instance from '../services/axios';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [modifiedTasks, setModifiedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await instance.get('/task/list');
                const sortedTasks = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.update_at));
                setTasks(sortedTasks);
            } catch (error) {
                toast.error('Error al cargar las tareas')
            }
        };
        fetchTasks();
    }, [])

    const createTask = async (newTask) => {
        try {
            const response = await instance.post('/task/create', newTask);
            setTasks([...tasks, response.data.task]);
            toast.success('Tarea agregada!');
        } catch (error) {
            toast.error('Error al agregar la tarea');
        }
    }
    const updateTask = async (updateTask) => {
        try {
            await instance.patch(`/task.edit/${updateTask.id}/`, updateTask);
            setTasks(tasks.map(task => (task.id === updateTask ? updateTask : task)));
            toast.success('Tarea actualizada');
        } catch (error) {
            toast.error('Error al actualizar la tarea');
        }
    }
    const deleteTaskById = async (taskId) => {
        try {
            await instance.delete(`/task/delete/${taskId}/`);
            setTasks(tasks.filter(task => (task.id !== taskId)));
            toast.success('Tarea Eliminada!');
        } catch (error) {
            toast.error('Error al eliminar la tarea');
        }
    }
    const deleteAllTasks = async () => {
        try {
            await instance.delete('/task/delete-all');
            setTasks([]);
            toast.success('Tareas eliminadas con exito');
        } catch (error) {
            toast.error('Error al eliminar las tareas!');
        }
    }
    const saveChanges = async () => {
        try {
            await instance.patch('/task/update-state', { tasks: modifiedTasks });
            setModifiedTasks([]);
            toast.success('Cambios de estado aplicado!');
        } catch (error) {
            toast.error('Error al guardar cambios');
        }
    }
    const handleTaskStateChange = (taskId, completed) => {
        const originalTask = tasks.find(task => task.id === taskId);
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed } : task
        ));

        if (originalTask.completed !== completed) {
            setModifiedTasks(prev => {
                const alreadyModified = prev.find(task => task.id === taskId);
                if (alreadyModified) {
                    return prev.map(task =>
                        task.id === taskId ? { ...task, completed } : task
                    );
                } else {
                    return [...prev, { id: taskId, completed }];
                }
            });
        } else {
            setModifiedTasks(prev =>
                prev.filter(task => task.id !== taskId)
            );
        }
    };
    return {
        tasks,
        modifiedTasks,
        createTask,
        updateTask,
        deleteTaskById,
        deleteAllTasks,
        saveChanges,
        handleTaskStateChange
    }


};

export default useTasks