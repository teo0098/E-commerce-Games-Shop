import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const Spinner = props => (
    <Loader
         type="TailSpin"
         color={props.color ? props.color : "rgba(12, 11, 11, 0.842)"}
         height={50}
         width={50}
         style={{ margin: '2vh 0' }}
      />
);

export default Spinner;