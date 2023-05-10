import React from 'react';

function Records({records}) {
    return (
        <div className="row">
           
            <div className="col-12 ml-auto">
                <div className="form-group">
                    <label className="form-select form-control w-25 ml-auto"
                    >Total records : {records}</label>
                </div>
            </div>
        </div>
    );
}

export default Records;