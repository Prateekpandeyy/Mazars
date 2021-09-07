import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

class MultiSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        plainArray: ["Option 1", "Option 2", "Option 3",
         "Option 4", "Option 5"],
        objectArray: [
          { key: "Option 1", cat: "Group 1" },
          { key: "Option 2", cat: "Group 1" },
          { key: "Option 3", cat: "Group 1" },
          { key: "Option 4", cat: "Group 2" },
          { key: "Option 5", cat: "Group 2" },
          { key: "Option 6", cat: "Group 2" },
          { key: "Option 7", cat: "Group 2" }
        ],
        selectedValues: [
          { key: "Option 1", cat: "Group 1" },
          { key: "Option 2", cat: "Group 1" }
        ]
      };
     
    //   this.addItem = this.addItem.bind(this);
    }
    
    // addItem() {
    //   this.selectedValues.push({ key: "Option 3",
    //    cat: "Group 1" });
    // }
  
    render() {
      const { plainArray, objectArray, selectedValues } = this.state;
      return (
        <div className="App">
         
          <div className="col-12 d-md-flex">
          
            <div className="examples col-12 col-md-5">
                           
  
              <h4 id="group" className="mt40">
                6. Multiselect with grouping
              </h4>
              <Multiselect
                options={objectArray}
                displayValue="key"
                groupBy="cat"
                showCheckbox={true}
              />
              {/* <code className="displayBlock mt10">
                &lt;Multiselect
                <br />
                &nbsp;&nbsp;options=&#123;objectArray}
                <br />
                &nbsp;&nbsp;groupBy="cat"
                <br />
                &nbsp;&nbsp;displayValue="key"
                <br />
                &nbsp;&nbsp;showCheckbox=&#123;true}
                <br />
                />
              </code> */}
  
             
              
            </div>
          </div>
        </div>
      );
    }
  }
export default MultiSelect;
