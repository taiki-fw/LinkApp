import React from "react";
import request from "superagent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: "",
      alertTitle:"short"
    };
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newValue
    });
    this.check()
  }

  check () {
    let formBtn = document.getElementById("formBtn")
    if (this.state.title.length > 20) {
      this.setState({ alertTitle: "long" });
    } else if (this.state.title.length <= 0) {
      this.setState({ alertTitle: "short" });
    } else if(this.state.title.length <= 20 && this.state.title.length >= 1){
      this.setState({ alertTitle: "none" });
    }
    if(this.state.title !== "" && this.state.url !== "" && this.state.alertTitle === "none") {
      formBtn.disabled = false
    }else {
      formBtn.disabled = true
    }
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
    if (this.state.alertTitle === "long") {
      msgTitle = <p style={displayStyle}>*20文字以内</p>
    } else if (this.state.alertTitle === "none"){
      msgTitle = <p></p>
    } else if (this.state.alertTitle === "short") {
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
