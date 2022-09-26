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
        console.log("cal", e.target.value)
        let calVal = []
        calVal = this.props.formInstallmentInfo.amountVal;
        calVal[i] = e.target.value;
        
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
console.log("InvoiceValue", this.props.formInstallmentInfo)
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
                       disabled = {this.props.formInstallmentInfo.boxEnable[i] === 0 ? true : false}
                       name={this.state.values[i]}
                       onChange={this.handleChange1.bind(this, i)}
                      value={this.props.formInstallmentInfo.amountVal[i]}
                   />
               </div> :   ""
}
{this.props.clearValue == false ? 
    <div class="col-md-6 my-2">
                       
                       <input
                           type="text"
                           className="form-control"
                           disabled = {this.props.formInstallmentInfo.boxEnable[i] === 0 ? true : false}
                           name={this.state.values[i]}
                           onChange={this.handleChange1.bind(this, i)}
                           value={this.props.formInstallmentInfo.amountVal[i]} />
                   </div> : ""}
          {this.props.clearValue == true ? 
           <div class="col-md-6 my-2">
                       
           <input
               type="date"
               className="form-control"
               required
               disabled = {this.props.formInstallmentInfo.boxEnable[i] === 0 ? true : false}
               name={this.state.dates[i]}
               onChange={this.handleChange2.bind(this, i)}
               value={this.props.formInstallmentInfo.dueDate[i]}
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
               disabled = {this.props.formInstallmentInfo.boxEnable[i] === 0 ? true : false}
               name={this.state.dates[i]}
               onChange={this.handleChange2.bind(this, i)}
               value={this.props.formInstallmentInfo.dueDate[i]}
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



