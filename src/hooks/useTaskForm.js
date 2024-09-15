import { useState,useEffect } from "react";
import useCreateForm from "./useCreateForm";
import useEditTaskForm from "./useEditForm";


const useTaskForm = (initialTask = null) =>{
    const [isEditing, setIsEditing] = useState(false);
    const createForm = useCreateForm();
    const editForm = useEditTaskForm(initialTask);

    const toggleForm = ()=>{
        setIsEditing(prev => !prev);
    };
    useEffect(()=>{
        if(initialTask){
            setIsEditing(true);
        }
    },[initialTask]);
    const handleFormChange = (e)=>{
        if(isEditing){
            editForm.handleChange(e);
        }else{
            createForm.handleChange(e);
        }
    };
    const handleFormReset = () =>{
        if(isEditing){
            editForm.handleReset();
        }else{
            createForm.handleReset();
        }
    };
    return {
        isEditing,
        createForm,
        editForm,
        toggleForm,
        handleFormChange,
        handleFormReset
    };
};

export default useTaskForm;