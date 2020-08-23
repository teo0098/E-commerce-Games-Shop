import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import textInputStyles from '../../Credentials/textInputStyles';
import btnStyles from '../../Credentials/buttonStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './AddGame.module.scss';
import { Alert } from '@material-ui/lab';
import alertStyles from '../../Credentials/alertStyles';
import SignupInfo from '../../Credentials/Signup/SignupInfo/SignupInfo';
import useAddGame from '../../useHooks/useAddGame';

const AddGame = props => {
    const { register, handleSubmit, errors, state, isCategoryChecked, 
        isConsoleChecked, onSubmit, checked, ticked, file, imageUpload, uploadImage } = useAddGame(props);
    
    return (
        <div className={styles.AddGame}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.AddGame__form}>
                <div className={styles.AddGame__picture}>
                    <i className={`fas fa-camera ${styles.AddGame__camera}`}></i>
                    <span className={styles.AddGame__span}>Post an image of the game</span>
                    <span className={styles.AddGame__span}>Recommended image resolution: 1920px x 1080px</span>
                    <span className={styles.AddGame__span}>Allowed image types: .jpg, .jpeg, .png</span>
                    <span className={`${styles.AddGame__span} ${styles.AddGame__file}`}>Image selected: {file.image === null ? "None" : file.image.name} </span>
                    <input onChange={uploadImage} ref={imageUpload} type="file" hidden />
                    <Button onClick={() => imageUpload.current.click()} style={{marginTop: '2vh'}} variant="contained" color="primary">
                        Upload image
                    </Button>
                    {file.error ? <Alert style={alertStyles} severity="error"> {file.errorMSG} </Alert> : null}
                </div>
                <div className={styles.AddGame__text}>
                    <div>
                        <TextField inputRef={register({ required: true, pattern: { value: /^[A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ]{1}([A-Za-z0-9ęóąśłżźćńĘÓĄŚŁŻŹĆŃ:\-\s]{1,49})?$/ } })} 
                           name="gameName" style={textInputStyles} label="Game's name" variant="filled" />

                        {errors.gameName && <Alert style={alertStyles} severity="error">Game's name must have from 1 up to 50 alphanumeric 
                            characters (spaces and polish letters included) and may contain characters like (: -)</Alert>}
                    </div>
                    <div>
                        <TextField inputRef={register({ required: true, pattern: { value: /^[1-9]([0-9]{1,6})?$/ } })} 
                            name="itemsAmount" style={textInputStyles} label="Items amount" variant="filled" />

                        {errors.itemsAmount && <Alert style={alertStyles} severity="error">Game's items amount must be integer number greater than 0 and can't be to large</Alert>}
                    </div>
                    <div>
                        <TextField inputRef={register({ required: true, pattern: { value: /^[1-9]([0-9]{1,6})?(\.[0-9]{2})?$/ } })}
                             name="gamePrice" style={textInputStyles} label="Game's price" variant="filled" />

                        {errors.gamePrice && <Alert style={alertStyles} severity="error">Game's price must be greater than 0$
                            in the format $$$$$$$(from 1 up to 7 digits).$$(dot and price after dot are optional)</Alert>}
                    </div>
                    <TextField inputRef={register({ required: true })} style={textInputStyles} variant="filled"
                        name="gameDate" label="Game's released date" type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true}} />      
                </div>
                <div className={styles.AddGame__descGame}>
                    <label className={styles.AddGame__label} htmlFor="description">Game's description</label>
                    <textarea style={textInputStyles} ref={register({ required: true, validate: value => {
                            return value.match(/\b([A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+)\b/g).length >= 20; } })}   
                        name="gameDesc" className={styles.AddGame__desc} id="description"></textarea>

                        {errors.gameDesc && <Alert style={alertStyles} severity="error">Game's description should have at least 20 words and not contain ` character</Alert>}
                </div>
                <div className={styles.AddGame__category}>
                    <span className={styles.AddGame__label}>Game's category</span>
                    <div className={styles.AddGame__categories}>
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Action" value="Action"/>}
                            label="Action"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="RPG" value="RPG"/>}
                            label="RPG"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Adventure" value="Adventure"/>}
                            label="Adventure"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="FPS" value="FPS"/>}
                            label="FPS"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Strategy" value="Strategy"/>}
                            label="Strategy"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Sport" value="Sport"/>}
                            label="Sport"
                        />
                        <FormControlLabel
                            onChange={isCategoryChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Simulation" value="Simulation"/>}
                            label="Simulation"
                        />
                    </div>
                    {ticked.category && checked.category < 1 ? <Alert style={alertStyles} severity="error">Select some category of the game</Alert> : null}
                </div>
                <div className={styles.AddGame__category}>
                    <span className={styles.AddGame__label}>Game's consoles</span>
                    <div className={styles.AddGame__categories}>
                        <FormControlLabel
                            onChange={isConsoleChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="PS3" value="PS3"/>}
                            label="PS3"
                        />
                        <FormControlLabel
                            onChange={isConsoleChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="PS4" value="PS4"/>}
                            label="PS4"
                        />
                        <FormControlLabel
                            onChange={isConsoleChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="XBOXONE" value="Xbox One"/>}
                            label="Xbox One"
                        />
                        <FormControlLabel
                            onChange={isConsoleChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="Nintendo" value="Nintendo"/>}
                            label="Nintendo"
                        />
                        <FormControlLabel
                            onChange={isConsoleChecked}
                            control={<Checkbox inputRef={register()} color="primary" name="PC" value="PC"/>}
                            label="PC"
                        />
                    </div>
                    {ticked.console && checked.console < 1 ? <Alert style={alertStyles} severity="error">Select some console for the game</Alert> : null}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <SignupInfo state={state}> 
                        {props.success}
                    </SignupInfo>
                </div>
                <Button type="submit" style={{ ...btnStyles, alignSelf: 'center' }} variant="contained" color="primary">
                    {props.action}
                </Button>
            </form>
        </div>
    )
}

export default AddGame;