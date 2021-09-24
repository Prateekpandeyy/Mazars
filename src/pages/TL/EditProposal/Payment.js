import React from "react";


export default class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            dates: [],
            isLoading: true
        };
    }


    amount = this.props.installment_amount
    installment_amount = this.amount.split(',');
    temp = this.installment_amount
    temp2= []
    handleChange1(i, e) {
        const { value } = e.target
        this.temp[i] = value
       this.temp2 = this.temp.slice(0, this.props.installment);
    
        this.setState({
            values: {
              ...this.temp.slice(0, this.props.installment)
            }
        },
            () => {
                this.props.paymentAmount(this.state.values)
            })
    }


    due_date = this.props.due_date;
     installment_due_dates = this.due_date.split(',')
    installmentDueDate = this.installment_due_dates;

    handleChange2(i, e) {
        const { value } = e.target
        this.installmentDueDate[i] = value

        this.setState({
            dates: {
              ...this.installmentDueDate
            }
        },
            () => {
                this.props.paymentDate(this.state.dates)
            })
    }

    componentDidMount() {
        this.setState({ isLoading: false });
        
        var amount = this.props.installment_amount
        var date = this.props.due_date

        // const installment_amount = this.props.setClearValue === false ? amount.split(',') : []
        const due_date = date.split(',');
        const installment_amount = amount.split(',');
        this.props.paymentAmount(installment_amount);
        this.props.paymentDate(due_date)
    }



    render() {

        var amount = this.props.installment_amount
        var date = this.props.due_date

        const installment_amount = amount.split(',');
        const due_date = date.split(',');

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
                            defaultValue={installment_amount[i] == "0" ? "" : installment_amount[i]}
                        />
                    </div>

                    <div class="col-md-6 my-2">
                       
                        <input
                            type="date"
                            className="form-control"
                            name={this.state.dates[i]}
                            onChange={this.handleChange2.bind(this, i)}
                            defaultValue={due_date[i]}
                            min={this.props.item}
                        />
                    </div>
                </div>
            );
        }

        if (this.state.isLoading) {
            return <div>Loading...</div>
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
