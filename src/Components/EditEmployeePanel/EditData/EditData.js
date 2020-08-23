import React from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../../Spinner/Spinner';
import Error from '../../Error/Error'; 
import CreateUser from '../../RenderProps/createUser';
import SignupInfo from '../../Credentials/Signup/SignupInfo/SignupInfo';
import btnStyles from '../../Credentials/buttonStyles';
import Button from '@material-ui/core/Button';
import styles from '../../AddEmployeePanel/AddEmployeePanel.module.scss';
import styles2 from './EditData.module.scss';
import Name from '../../Inputs/Name/Name';
import Lastname from '../../Inputs/Lastname/Lastname';
import Phone from '../../Inputs/Phone/Phone';
import Nickname from '../../Inputs/Nickname/Nickname';
import Email from '../../Inputs/Email/Email';

const EditData = props => {

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: props.state.data.name,
            lastname: props.state.data.lastname,
            phone: props.state.data.phone,
            nickname: props.state.data.nickname,
            email: props.state.data.email
        }
    });

    return (
        <div className={styles.AddEmployeePanel}>
            {props.state.error ?
                <Error>
                    {props.state.errorMsg}
                </Error>
                :
                null
            }
            {props.state.loading ?
                <Spinner />
                :
                props.state.error === false ?
                <React.Fragment>
                    <CreateUser userUpdate={props.userUpdate} url="/updateUser.php" mode={props.mode} render={(onSubmit, state2) => (
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div className={styles.AddEmployeePanel__grid}>
                                <div className={styles2.EditData__cont}>
                                    <Name defaultValue={props.state.data.name} errors={errors} register={register} />
                                </div>
                                <div className={styles2.EditData__cont}>
                                    <Lastname defaultValue={props.state.data.lastname} errors={errors} register={register} />
                                </div>
                                <div className={styles2.EditData__cont}>
                                    <Phone defaultValue={props.state.data.phone} errors={errors} register={register} />
                                </div>
                                <div className={styles2.EditData__cont}>
                                    <Nickname defaultValue={props.state.data.nickname} errors={errors} register={register} />
                                </div>
                                <div className={styles2.EditData__cont}>
                                    <Email defaultValue={props.state.data.email} errors={errors} register={register} />
                                </div>
                                <input ref={register()} type="text" readOnly value={props.state.data.employeeID ? props.state.data.employeeID : props.state.data.customerID} hidden name="id" />
                            </div>
                            <SignupInfo state={state2}>
                                {props.success}
                            </SignupInfo>
                            <Button type="submit" style={btnStyles} variant="contained" color="primary">
                                {props.btn}
                            </Button>
                        </form>
                    )}>
                        {props.error}
                    </CreateUser>
                    {props.children}
                </React.Fragment>
                :
                null
            }
        </div>
    )
}

export default EditData;