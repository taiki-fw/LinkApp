import React from "react";
import request from "superagent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: "",
      alertTitle:"short",
      send: true
    };
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newValue
    });
    this.check(e)
  }

  check (e) {
    let formBtn = document.getElementById("formBtn")
    let maxLength = 20
    let minLength = 0
    let titleLength = e.target.value.length
    let checkValue = e.target.value
    let checkUrl = checkValue.match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)
    let alertType = "none"
    let sendBtn = true
    if(e.target.name === "title"){
      if (titleLength > maxLength) {
        alertType = "long"
      } else if (titleLength <= minLength) {
        alertType = "short"
      } else {
        alertType = "none"
      }
    }
    this.setState({ alertTitle: alertType })
    console.log(alertType)
    if(this.state.title || this.state.url || alertType !== "none" || checkUrl) {
      sendBtn = true
    }else {
      sendBtn = false
    }
    console.log(sendBtn)
    this.setState({ send: sendBtn})
    formBtn.disabled = this.state.send
    console.log(formBtn.disabled)
  }

  post() {
    request
      .post("/link")
      .send({
       title: this.state.title,
        comment: this.state.comment,
        url: this.state.url
      })
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
  }

  render() {
    const displayStyle = {
      color: 'red',
      fontSize: '5px'
    }
    let msgTitle = null
    let alertType = this.state.alertTitle
    switch(alertType) {
      case "long":
        msgTitle = <p style={displayStyle}>*20文字以内</p>
      case "short":
        msgTitle = <p></p>
      case "none":
        msgTitle = <p style={displayStyle}>*必須</p>
    }
    return (
      <>
        <label>
          見出し
          <br />
          {msgTitle}
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          コメント
          <br />
          <input
            type="text"
            value={this.state.comment}
            name="comment"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          URL
          <br />
          <input
            type="text"
            value={this.state.url}
            name="url"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <button id="formBtn" onClick={e => this.post()} disabled="disabled">送信</button>
        </>
    );
  }
}

export default App;
