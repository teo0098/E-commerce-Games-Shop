import { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import reducer from '../Home/useReducer/reducer';
import initialState from '../Home/useReducer/initialState';
import deleteReducer from '../Employees/deleteReducer/reducer';
import deleteInitialState from '../Employees/deleteReducer/initialState';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
});

const EditOrDeleteData = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [deleteState, deleteDispatch] = useReducer(deleteReducer, deleteInitialState);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: 'LOADING' });
            try {
                let properData;
                if(props.mode !== 'games') properData = await axios.get(`${props.url}?mode=${props.mode}`);
                else properData = await axios.get(props.url);
                if (properData.data === 'ERROR') throw new Error();
                dispatch({ type: 'SUCCESS', data: properData.data });
            }
            catch (e) {
                dispatch({ type: 'ERROR', error: props.children });
            }
        }
        getData();
    }, [props]);

    const deleteData = async dataID => {
        deleteDispatch({ type: 'LOADING', dataID });
        try {
            const formData = new FormData();
            formData.append('ID', dataID);
            formData.append('mode', props.mode)
            const deletee = await axios.post('/deleteData.php', formData);
            if (deletee.data === 'ERROR') throw new Error();
            let updatedData;
            if(props.mode === 'employees') updatedData = state.data.filter(data => data.employeeID !== dataID);
            else if (props.mode === 'games') updatedData = state.data.filter(data => data.gameID !== dataID);
            dispatch({ type: 'SUCCESS', data: updatedData });
            deleteDispatch({ type: 'SUCCESS' });
        }   
        catch (e) {
            deleteDispatch({ type: 'ERROR' });
        }
    }

    return (
        props.render(classes, state, history, deleteState, dataID => deleteData(dataID))
    )
}

export default EditOrDeleteData;