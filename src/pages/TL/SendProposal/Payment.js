import React from "react";

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
        };
    }

    handleChange1(i, e) {
        if (isNaN(e.target.value)) {
            this.setState({ error: "Please insert only digit" })
        }
        else {
            this.setState({ error: "" })
        }
        this.setState({
            values: { ...this.state.values, [i]: e.target.value },
            allAmount: { ...this.props.allAmount, [i]: e.target.value }
        },
            () => {
                this.props.paymentAmount(this.state.values)
            })

    }

    handleChange2(i, e) {
        this.setState({
            dates: { ...this.state.dates, [i]: e.target.value }
        },
            () => {
                this.props.paymentDate(this.state.dates)
            })
    }
// componentDidMount(){
//     console.log("propsAmount", this.props.allAmount)
//     // this.setState({
//     //     values : this.props
//     // })
// }
componentDidUpdate(prevProps, prevState){
    
    console.log("shold",this.props.installment, prevProps)
    if(prevProps.installment !== this.props.installment){
        this.setState({
            values : this.props.allAmount
        })
    }
   
    
}
    render() {
        // console.log("props", this.props)
        var fieldsArray = [];

        for (var i = 0; i < this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    <div class="col-md-6 my-2">
                      
                        <input
                            type="text"
                            className="form-control"
                            name={this.state.values[i]}
                            onChange={this.handleChange1.bind(this, i)}
                            value = {this.state.values[i]}
                        />
                        <p style={{ "display": "block", "color": "red" }}>{this.state.error}</p>
                    </div>

                    <div class="col-md-6 my-2">
                      
                        <input
                            type="date"
                            className="form-control"
                            name={this.state.dates[i]}
                            onChange={this.handleChange2.bind(this, i)}
                            min={this.props.item}
                        />
                    </div>
                </div >
            );
        }

        return (
            <>
           
            <div className="inputs">
                {this.props.installment > 0 ?
            <tr style={{display : "flex", width : "100%", justifyContent : "space-around"}}>
              <td>Installment amount</td>
              <td>Due date</td>
          </tr> : ""}
          {fieldsArray}
      </div>
      </>
        );
    }
}