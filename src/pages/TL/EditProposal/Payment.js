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
    installment_amount = this.amount
    temp = this.installment_amount
    tamp2;
    handleChange1(i, e) {
        let calVal = []
        calVal = this.props.installment_amount.remainAmount;
        calVal[i] = e.target.value
        console.log("cal", calVal)
       
    //     const { value } = e.target
    //     this.temp[i] = value

    // console.log("slices", this.temp.slice(0, this.props.installment))
    //     this.setState({
    //         values: {
    //           ...this.temp.slice(0, this.props.installment)
    //         }
    //     },
    //         () => {
    //             this.props.paymentAmount(this.state.values)
    //         })
    const { values } = this.state;
    values.splice(i, 1, e.target.value)
    this.setState({ values: [...values] }, () => {
      //call back function of set state
    //   console.log(this.state.rocket)
      this.props.paymentAmount(calVal)
    });
    }


    due_date = this.props.due_date;
     installment_due_dates = this.due_date.split(',')
    installmentDueDate = this.installment_due_dates;

    handleChange2(i, e) {
        console.log("eee", e.target.value)
        let calVal = []
        calVal = this.props.invoiceValue.due_dates
        calVal[i] = e.target.value
        const { dates } = this.state;
        dates.splice(i, 1, e.target.value)
        this.setState({ dates: [...dates] }, () => {
            //call back function of set state
            console.log(this.state.rocket)
            this.props.paymentDate(calVal)
          });
    }

    componentDidMount() {
        this.setState({ isLoading: false });
       
        var amount = this.props.installment_amount
        
        var date = this.props.due_date
        this.props.paymentAmount(amount)
       var installment_amount = amount
      
       
        const due_date = date.split(',');


        this.props.paymentAmount(installment_amount);
       this.props.paymentDate(due_date)
    }



    render() {

        var date = this.props.due_date  
        const due_date = date.split(',')
        var fieldsArray = [];


        for (var i = 0; i < this.props.installment; i++) {
            fieldsArray.push(
                <div className="row">
                    {this.props.clearValue == true ? 
                   <div class="col-md-6 my-2">
                       
                   <input
                       type="text"
                       className="form-control"
                       disabled = {this.props.invoiceValue.installment_number.length > i ? true : false}
                       name={this.state.values[i]}
                       onChange={this.handleChange1.bind(this, i)}
                      value={this.props.invoiceValue.installment_number.length > i ? this.props.installment_amount.freezeAmount[i] :
                        this.props.installment_amount.remainAmount[i - this.props.invoiceValue.installment_number.length]}
                   />
               </div> :   ""
}
{this.props.clearValue == false ? 
    <div class="col-md-6 my-2">
                       
                       <input
                           type="text"
                           className="form-control"
                           disabled = {this.props.invoiceValue.installment_number.length > i ? true : false}
                           name={this.state.values[i]}
                           onChange={this.handleChange1.bind(this, i)}
                           value={this.props.invoiceValue.installment_number.length > i ? this.props.installment_amount.freezeAmount[i] :
                            this.props.installment_amount.remainAmount[i - this.props.invoiceValue.installment_number.length]}
                       />
                   </div> : ""}
          {this.props.clearValue == true ? 
           <div class="col-md-6 my-2">
                       
           <input
               type="date"
               className="form-control"
               required
               disabled = {this.props.invoiceValue.installment_number.length > i ? true : false}
               name={this.state.dates[i]}
               onChange={this.handleChange2.bind(this, i)}
        defaultValue={this.props.invoiceValue.installment_number.length > i ? this.props.invoiceValue.due_dates[i] :
                this.props.invoiceValue.due_dates[i - this.props.invoiceValue.installment_number.length]}
            
               min={this.props.item}
               max={this.props.max}
           />
       </div> : ""}  
       {this.props.clearValue == false ? 
           <div class="col-md-6 my-2">
                       
           <input
               type="date"
               className="form-control"
               required
               disabled = {this.props.invoiceValue.installment_number.length > i ? true : false}
               name={this.state.dates[i]}
               onChange={this.handleChange2.bind(this, i)}
               defaultValue={this.props.invoiceValue.installment_number.length > i ? this.props.invoiceValue.due_dates[i] :
               this.props.invoiceValue.due_dates[i]}
            
               min={this.props.item}
               max={this.props.max}
           />
       </div> : ""}         
                   
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
              <td>Installment amount</td>
              <td>Due date</td>
          </tr> : ""}
          {fieldsArray}
      </div>
      </>
        );
    }
}



