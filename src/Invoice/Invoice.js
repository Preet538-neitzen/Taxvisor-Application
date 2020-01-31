import React, { Component } from 'react'
import axios from 'axios'
import LineItems from './LineItems'
// import image from "../../images//logo.png";
import styles from './Invoice.module.scss'
import uuidv4 from 'uuid/v4'
import fire from '../Config/Config'
import firebase from 'firebase/app'
import 'firebase/database';


class Invoice1 extends Component {
 
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote=this.removeNote.bind(this);
    // var userId = firebase.auth().currentUser.uid;
    // this.database=;
    this.database=fire.database().ref().child('Invoices');
    this.handleChange =  this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClientGstInChange = this.onClientGstInChange.bind(this);
    // this.handleInvoiceChange= this.handleInvoiceChange.bind(this);
    this.state={
     
    user: null,
    hi:'WELCOME TO TAXVISOR',
    email: '',
    password: '',
    errorMessage:'',
        taxRate: 0.00,
        username:'',
        searcher:'',
        Address:'',
        Email:'',
        person:'',
        Client_username:'',
        Client_searcher:'',
        Client_Email:'',
        Client_State:'',
        lineItems: [
          {
            
            id: 'initial',      // react-beautiful-dnd unique key
            name: '',
            description: '',
            quantity: 0,
            price: 0.00,
        }
        ],
        questionBank:[],
        notes:[],
        userKaId:'',
        total:0,
        status:'',
    }
  }

  locale = 'en-US'
  currency = 'USD'

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat(
        [{ id: uuidv4(), name: '', description: '', quantity: 0, price: 0.00 }]
      )
    })
  }

  componentDidMount(){
    this.authListener();
    
}


authListener() {
  fire.auth().onAuthStateChanged((user) => {

    if (user) {
      this.setState({ user });
      
    
  
    } else {
      this.setState({ user: null });
  
    }
  });
}


addNote(note){
  fire.auth().onAuthStateChanged((user) => {

    if (user) {
      this.setState({ user });
      
      this.setState({userKaId:userId})
  
    } else {
      this.setState({ user: null });
  
    }
  });


  
  var userId = firebase.auth().currentUser.uid;
  fire.database().ref(userId).child(this.state.Client_username).set({
    Sender: this.state.username,
    Sender_Email: this.state.email,
    Sender_GST_IN : this.state.searcher,
    Sender_State:this.state.State,
    Receiver:this.state.Client_username,
    Receiver_GST_IN : this.state.Client_searcher,
    Receiver_Email: this.state.Client_Email,
    Receiver_State : this.state.Client_State,
    Product_1 : this.state.lineItems[0].name,
    Product_Description_1: this.state.lineItems[0].description,
    Product_Quantity_1: this.state.lineItems[0].quantity,
    Product_Price_1: this.state.lineItems[0].price,
    Product_2 : this.state.lineItems[1].name,
    Product_Description_2: this.state.lineItems[1].description,
    Product_Quantity_2: this.state.lineItems[1].quantity,
    Product_Price_2: this.state.lineItems[1].price,
    total: this.formatCurrency(this.calcGrandTotal()),
    taxRate:this.state.taxRate   ,
    status: this.state.status
  });
}


removeNote(noteId){
  this.database.child(noteId).remove();
}

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handlePayButtonClick = () => {  
    this.setState({total:this.formatCurrency(this.calcGrandTotal())})
    console.log("valueToBePassed : "  + this.state.total)
    if(this.state.Client_username==""){
      alert("Fail, Please input Client's Details")
    }else{
    alert('Success, your Invoice has been added to our database successfully...');
    const previousNotes = this.state.notes;
    fire.auth().onAuthStateChanged((user) => {
         
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        this.setState({userKaId:userId})
        this.setState({ user });
      }

 
}
    )
this.addNote();

    }

  }

  
  formatCurrency = (amount) => {
    // this.setState({
    //   total: amount
    // })
    // console.log(this.state.total)
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  }

  calcGrandTotal = () => {
    let value = this.calcLineItemsTotal() + this.calcTaxTotal()
    console.log(value)
   // this.handlePayValue(value)
    return value  

    
  }
  handlePayValue=(value)=>{
    this.setState({
      total:value
    })
    console.log("value: "  + this.state.total) 
  }

  onUsernameChange=(e)=>{
    this.setState({username:e.target.value})
  }

  onSearcherChange=(e)=>{
 
    this.setState({searcher:e.target.value})
    // switch(e.target.value.slice(0,2))
    // {
    //   case 01:
    //     this.setState({State:'Jammu & Kashmir'});
    //   default:
    //     this.setState({State:'Please enter a valid GSTIN'})
    // }

    if(e.target.value.slice(0,2)==='20'){
      this.setState({
        State:'Jharkhand, India',
      })
  }
  if(e.target.value.slice(0,2)==='22'){
      this.setState({
        State:'Odisha, India',
      })
  }
  if(e.target.value.slice(0,2)==='21'){
      this.setState({
          State:'Chattisgarh, India',
      })
  }
     
  }

  onClientGstInChange(e){
    this.setState({Client_searcher:e.target.value})
    if(e.target.value.slice(0,2)==='22'){
      this.setState({
        Client_State:'Odisha'
      })
  }
  }


    onAddressChange=(e)=>{
    this.setState({Address:e.target.value})
  }
    onStateChange=(e)=>{
    this.setState({State:e.target.value})
  
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
}

  render(){
    return (
<><div className={styles.invoice}>
      <div className={styles.brand}>
        <a href="/" className="navbar-brand" >
            {/* <img alt="Taxvisor" src={image} /> */}
          </a>
        </div>
        <div className="row">
          <div className="col-md-6">
          <h2>Sender's Details</h2>
        <form className="post" onSubmit={this.handleSubmit} >
              <div  className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Sender's Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  onChange={this.onUsernameChange}
                />
              </div>
              <div   className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Sender's GSTIN</label>
                <input
                  type="text"
                  name="mobile"
                  value={this.state.searcher}
                  className="form-control"
                  placeholder="Your GSTIN"
                  onChange={this.onSearcherChange}
                />
              </div>
              <div   className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Sender's State & Country</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.State}
                  className="form-control"
                  placeholder="Your State & Country (AUTO-FILLED)"
                  onChange={this.onStateChange}
                />
              </div>
              <div   className="form-group">
                <label style={{fontSize:'15px',color:'black'}} >Sender's Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  className="form-control"
                  placeholder="Your Email id"
                  onChange={this.handleChange}
                />
              </div>
              <div   className="form-group">
               
              </div>
            </form>
            </div><div className="vertical"></div>
            <div className="col-md-6">
              <h2>Client's Details</h2>
        <form className="post" onSubmit={this.handleSubmit} >
              <div  className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Client's Name</label>
                <input
                  type="text"
                  value={this.state.Client_username}
                  className="form-control"
                  name="Client_username"
                  placeholder="Client's Name"
                  onChange={this.handleChange}
                />
              </div>
              <div   className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Client's GSTIN</label>
                <input
                  type="text"
                  name="Client_searcher"
                  value={this.state.Client_searcher}
                  className="form-control"
                  placeholder="Client's GSTIN"
                  onChange={this.onClientGstInChange}
                />
              </div>
              <div   className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Client's State & Country</label>
                <input
                  type="email"
                  name="Client_State"
                  value={this.state.Client_State}
                  className="form-control"
                  placeholder="Client's State & Country (AUTO-FILLED)"
                  onChange={this.handleChange}
                />
              </div>
              <div   className="form-group">
              <label style={{fontSize:'15px',color:'black'}} >Client's Email</label>
                <input
                  type="text"
                  name="Client_Email"
                  value={this.state.Client_Email}
                  className="form-control"
                  placeholder="Client's Email"
                  onChange={this.handleChange}
                />
              </div>
              <div   className="form-group">
               
              </div>
            </form>
            </div>
            </div>
          
        <h2>Invoice</h2>

          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

        <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>GST Rate (%)</div>
                <div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleChange} onFocus={this.handleFocusSelect} /></div>
              </div>
              <form>
           
           <div className={styles.label}>Invoice Status</div>
                 <div className={styles.value}><input name="status" type="text" step="0.01" value={this.state.status} onChange={this.handleChange}  /></div>
              
             
                 </form>
         
            </div>
          </form>

         
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>   <button style={{marginRight: '25px'}} className="btn btn-success" onClick={this.logout} >Sign Out</button> 
          <button className={styles.payNow} onClick={this.handlePayButtonClick}>Pay Now</button>
        </div>
      </div>
     
      </>
    )
  }

}

export default Invoice1
