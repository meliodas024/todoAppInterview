import { useState } from 'react';

const useEditTaskForm = ( initialTask )=>{
    const [editingTask,setEditingTask] = useState(initialTask || { title: '', description: '', completed: false } );

    const handleChange = (e)=>{
        const {name,value,type,checked} = e.target;
        setEditingTask(prev=>({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleReset = ()=>{
        setEditingTask({ title: '', description: '', completed: false });
    };
    return {
        editingTask,
        handleChange,
        handleReset
    };

}


export default useEditTaskForm