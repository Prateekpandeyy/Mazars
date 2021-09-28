import React from 'react';
import { Spinner } from "reactstrap";


function Loader() {
    return (
        <>
            <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "center",
                height: "400px"
            }}>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
            </div>
        </>
    );
}

export default Loader;