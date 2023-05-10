import React from "react";

export default class YourComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      dates: [],
      isLoading: true,
    };
  }

  amount = this.props.installment_amount;
  installment_amount = this.amount;
  temp = this.installment_amount;
  tamp2;
  handleChange1(i, e) {
    let calVal = [];
    calVal = this.props.boxFormData.amount;
    calVal[i] = e.target.value;

    const { values } = this.state;
    values.splice(i, 1, e.target.value);
    this.setState({ values: [...values] }, () => {
      this.props.paymentAmount(calVal);
    });
  }

  due_date = this.props.due_date;
  installment_due_dates = this.due_date.split(",");
  installmentDueDate = this.installment_due_dates;

  handleChange2(i, e) {
    let calVal = [];
    calVal = this.props.boxFormData.dueDate1;
    calVal[i] = e.target.value;
    const { dates } = this.state;
    dates.splice(i, 1, e.target.value);
    this.setState({ dates: [...dates] }, () => {
      //call back function of set state

      this.props.paymentDate(calVal);
    });
  }

  componentDidMount() {
    this.setState({ isLoading: false });

    var amount = this.props.installment_amount;

    var date = this.props.due_date;
    this.props.paymentAmount(amount);
    var installment_amount = amount;

    const due_date = date.split(",");

    this.props.paymentAmount(installment_amount);
    this.props.paymentDate(due_date);
  }

  render() {
    var fieldsArray = [];

    for (var i = 0; i < this.props.installment; i++) {
      fieldsArray.push(
        <div className="row">
          {this.props.clearValue == true ? (
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                disabled={
                  this.props.boxFormData.boxEnable[i] === 0 ? true : false
                }
                name={this.state.values[i]}
                onChange={this.handleChange1.bind(this, i)}
                value={this.props.boxFormData.amount[i]}
              />
            </div>
          ) : (
            ""
          )}
          {this.props.clearValue == false ? (
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                disabled={
                  this.props.boxFormData.boxEnable[i] === 0 ? true : false
                }
                name={this.state.values[i]}
                onChange={this.handleChange1.bind(this, i)}
                value={this.props.boxFormData.amount[i]}
              />
            </div>
          ) : (
            ""
          )}
          {this.props.clearValue == true ? (
            <div className="col-md-6 my-2">
              <input
                type="date"
                className="form-control"
                required
                disabled={
                  this.props.boxFormData.boxEnable[i] === 0 ? true : false
                }
                name={this.state.dates[i]}
                onChange={this.handleChange2.bind(this, i)}
                value={this.props.boxFormData.dueDate1[i]}
                min={this.props.item}
                max={this.props.max}
              />
            </div>
          ) : (
            ""
          )}
          {this.props.clearValue == false ? (
            <div className="col-md-6 my-2">
              <input
                type="date"
                className="form-control"
                required
                disabled={
                  this.props.boxFormData.boxEnable[i] === 0 ? true : false
                }
                name={this.state.dates[i]}
                onChange={this.handleChange2.bind(this, i)}
                value={this.props.boxFormData.dueDate1[i]}
                min={this.props.item}
                max={this.props.max}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div className="inputs">
          {this.props.installment > 0 ? (
            <div className="row">
              <div className="col-md-6">
                <p>Installment</p>
              </div>
              <div className="col-md-6">
                <p>Due date</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {fieldsArray}
        </div>
      </>
    );
  }
}
