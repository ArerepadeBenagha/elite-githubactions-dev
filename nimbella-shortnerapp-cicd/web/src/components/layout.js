import React, { Component } from "react";
import axios from 'axios';
 
class Shortner extends Component {
   
  componentDidMount() {
    document.title = 'URL Shortener';
  }
      state = {
        actual_url: null,
        shorten_url_response: null,
      };
      constructor(props) {
        super(props);
        this.state = {actual_url: null,
          shorten_url_response: null,
        linkvalid:null};
      }

     
    
      handleClick = () => {
        //do something
        this.setState({shorten_url_response: null});
        if(this.ValidURL())
        {
          this.setData()
        }
        else
        {
          this.setState({linkvalid: "Please enter valid URL"});
        }
       
      }

       ValidURL() {
        // var pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator        
      return !!pattern.test(this.state.actual_url);
    }
      setUrl= (e)=> {
        this.setState({linkvalid: null});
        this.setState({actual_url: e.target.value});
        console.log(this.state)
    }

       setData() {
         console.log()
    axios.post("https://"+window.location.hostname+"/api/s/url", {actual_url:this.state.actual_url},{ headers: {'content-type': 'application/json'}})
        .then(response => this.setState({ shorten_url_response: response.data.short_url }));
    }

    
  render() {
    let header
    if (this.state.shorten_url_response) {

      header = <label className="labelclass">Your shortened URL is</label>

    } 
    let error
    if (this.state.linkvalid) {

      error = <label className="labelerror">Please enter a valid url</label>

    } 
    return (
      <div>
        <textarea class="textboxHeight" type="url" required pattern="^(http|https)://\.(.*)" className="textboxHeight"onChange={ this.setUrl } placeholder="paste the link to shorten.."/><br></br> <br></br>
       <input type="button" className="button" value="submit" onClick={this.handleClick}></input><br></br>
       {error}<br></br>
       {header}<br></br>
       
       <a className="resultTextArea" href={ this.state.shorten_url_response} target="_blank" rel="noopener noreferrer">{ this.state.shorten_url_response}</a>
      </div>
    );
  }
}
 
export default Shortner;
