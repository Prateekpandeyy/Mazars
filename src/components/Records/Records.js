import React from 'react';

function Records({records}) {
    return (
        <div class="row">
            <div className="col-9">
            </div>
            <div className="col-3">
                <div class="form-group">
                    <label className="form-select form-control"
                    >Total Records : {records}</label>
                </div>
            </div>
        </div>
    );
}

export default Records;