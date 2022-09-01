import { values } from "lodash";
import React from "react";
import { Spinner } from 'reactstrap';

export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
        };
    }
    amount = this.props.installment_amount
    installment_amount = this.amount
    temp = this.installment_amount
    handleChange1(i, e) {
        if (isNaN(e.target.value)) {
            this.setState({ error: "Please insert only digit" })
        }
        else {
            this.setState({ error: "" })
        }
        this.setState({
            values: { ...this.state.values, [i]: e.target.value }
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

    render() {
        var amount = this.props.installment_amount
        var fieldsArray = [];
console.log("installment", this.props.installment)
        for (var i = 0; i  < this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    <div class="col-md-6 my-2">
                      
                        <input
                            type="text"
                            className="form-control"
                            name={this.state.values[i]}
                            defaultValue={amount[i]}
                            onChange={this.handleChange1.bind(this, i)}
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
                            max={this.props.max}
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
              <td>Payment</td>
              <td>Due Dates</td>
          </tr> : ""}
          {fieldsArray}
      </div>
      </>
        );
    }
}
