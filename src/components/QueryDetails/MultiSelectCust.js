import React from "react";
export default class Form extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form>
        <div>
          <Books />
        </div>
      </form>
    );
  }
}
const Book = ({ children, value }) => (
  <option value={value}>{React.Children.only(children)}</option>
);

const Page = ({ children, value }) => (
  <option value={value}>{React.Children.only(children)}</option>
);

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      books: {
        Book1: {
          pages: [
            {
              text: "Page 1",
              value: "Page1",
            },
            {
              text: "Page 2",
              value: "Page2",
            },
          ],
          text: "Book 1",
          value: "Book1",
        },
        Book2: {
          pages: [
            {
              text: "Page 1",
              value: "Page1",
            },
            {
              text: "Page 2",
              value: "Page2",
            },
          ],
          text: "Book 2",
          value: "Book2",
        },
      },
    };
    this.state.currentBookKey = this.state.books.Book1.value;
  }
  selectOnChange = (event) => {
    this.setState((state) => ({ currentBookKey: event.target.value }));
  };
  render() {
    return (
      <div>
        <label>Book</label>
        <select>
          <option>
            onSelect
            <option>Thi</option>
          </option>
          <option>second</option>
          <option>Third</option>
        </select>
      </div>
    );
  }
}
