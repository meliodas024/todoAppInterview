import {useState} from 'react'

const useCreateForm=()=>{
    const [newTask,setNewTask] = useState({title:'',description:''});

    const handleChange = (e) =>{
        const {name,value}=e.target;
        setNewTask(prev=>({...prev,[name]:value}));
    };
    const handleReset = () =>{
        setNewTask({title:'',description:''});
    };
    return{
        newTask,
        handleChange,
        handleReset
    };
};

export default useCreateForm