import React, { Component } from "react";
import Customerheader from "../customerheader";
import Sidebar from "./sidebar";

export class confirmtransfer extends Component {
  constructor(){
    super()
    this.state ={
      fund:'',
      sender:'',
      receiver:'',
      fname:'',
      amt:'',
      pin:''
    }
  }
  async componentDidMount(){
    const token = await JSON.parse(localStorage.getItem('token'));
    fetch('/userdetails', {
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
        
    })
    .then(res => res.json())
    .then(result => {
      //console.log(result)
      this.setState({
        sender:result.acct,
        fname:result.fname
    }) })
    .catch(err => console.log(err))
  }
  handleSender(e){
    this.setState({sender: e.target.value})

  }
  handleReceiver(e){
    this.setState({receiver:e.target.value})
  }
  handlePin(e){
      this.setState({pin:e.target.value})
  }
  handleFund(e){
    this.setState({fund: e.target.value})
    
  }
  handleSend(e){
    e.preventDefault()
    console.log(this.state.pin)
    fetch('/fund', {
      method:'PUT',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        fund: this.state.fund,
        pin:this.state.pin,
        sender: this.state.sender,
        receiver: this.state.receiver
      })
    })
    .then( res => res.json())
    .then( res => {
      alert(res.message)
     
        //this.handleTransact()
  
    })
    .catch( err => console.log(err))
  }
  handleTransact(e) {
    fetch('/new', {
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        amount:document.getElementById('amt').value,
        sender:document.getElementById('fname').value

      })

    })
    .then( res => res.json())
    .then( res => console.log(res))
    .catch(err => console.log(err))
  }
  amountChange(){
    this.setState({amt:this.state.fund})
  
  }
  render() {
    return (
      <div>
                <Customerheader />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>

                        <div className="col-lg-8">


                            <div className="card" style={{ width: "50%", margin: "60px auto" }}>
                                <div className="card-header dark-text text-center py-4">
                                    <h4> Transfer Process</h4>
                                    <div className="card-body text-center">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="hidden"
                                                name=""
                                                id=""
                                                placeholder="Account Number"
                                                value={this.state.sender}
                                                onChange={this.handleSender.bind(this)}
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder="Receiver Account Number"
                                                value={this.state.receiver}
                                                onChange={this.handleReceiver.bind(this)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder="Amount"
                                                value={this.state.fund}
                                                onChange={this.handleFund.bind(this)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder="Security Pin"
                                                value={this.state.pin}
                                                onChange={this.handlePin.bind(this)}
                                            />
                                        </div>
                                    {/* transaction pager */}
                                    {/* <h4>Transaction</h4> */}
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="hidden"
                                                name=""
                                                id="amt"
                                                placeholder="Amount"
                                                value={this.state.fund}
                                                //onChange={this.amountChange.bind(this)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="hidden"
                                                name=""
                                                id="receiver"
                                                placeholder="Recipient Acct no"
                                                value={this.state.receiver}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="hidden"
                                                name=""
                                                id=""
                                                placeholder="transaction type"
                                                value="debit"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="hidden"
                                                name=""
                                                id="fname"
                                                placeholder="transaction type"
                                                value={this.state.fname}
                                            />
                                        </div>
                                        <button className="site-btn sb-gradients" onClick={this.handleSend.bind(this)}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}

export default confirmtransfer;
