import React from 'react';

function Mandatory(props) {
    return (
        <>
            <div style={{ display: "flex",  width: "100%" }}>
                <span className="declined mr-4">*Mandatory</span>
            </div>
        </>
    );
}

export default Mandatory;