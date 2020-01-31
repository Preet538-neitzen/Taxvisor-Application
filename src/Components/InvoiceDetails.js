import React, { Component } from 'react'
import fire from '.././Config/Config'
import firebase from 'firebase/app'

export class InvoiceDetails extends Component {
    constructor(props){
        super(props);
        this.state={
          user: null,
          email: '',
          password: '',
          username:'',
          LastName:'',
          PhoneNumber:'',
          valueToBePassed:'',
          text:'',
          newVT:'',
          myStory:'',
          allStories:[],
          people:[],
          peopleId:[],
          items:[],
          readFullStory:false,
          storyDescription:'',
          newDataObj:{
            story:'',
            name:'',
            storyDescription:'',
            show:false,
          },
          bool:null,
          displayFullStory:false,
          nulledState:false,
          errorMessage:'',
          VerificationCode:'',
          getInvoice:'',
          arrayOfData:[],
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.newFun = this.newFun.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        // this.readFullStory = this.readFullStory.bind(this);
        this.toggleFullStory = this.toggleFullStory.bind(this);
        // this.onSignInSubmit = this.onSignInSubmit.bind(this);
      }
      handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    
        handleChangeEmail(e){
          this.setState({email:e.target.value})
        }
    
        handleChangePass(e){
          this.setState({password:e.target.value})
        }
    
    
        login(e) {
          e.preventDefault();
          fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          }).catch((error) => {
              console.log(error);
              this.setState({errorMessage:error.message});
            });
        }
      
      
      
        signup(e){
          e.preventDefault();
          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          }).then((u)=>{})
          .catch((error) => {
              console.log(error);
              this.setState({errorMessage:error.message});
            })
        }
    
        
       
        
        componentDidMount(){     
          fire.auth().onAuthStateChanged((user) => {
         
            if (user) {





              this.setState({ user });
              var user = firebase.auth().currentUser;
              var db =firebase.firestore();
              var docRef = db.collection("currentInvoice").doc("currentInvoice");
let self = this;
docRef.get().then(function(doc) {
    if (doc.exists) {
        self.setState({getInvoice:doc.data().currentOpen})
        console.log(self.state.getInvoice)
        console.log("Document data:", doc.data().currentOpen);
    } 
    else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

if(user){
  
    let self = this;
    var data = firebase.database();
    var leadsRef = data.ref(user.uid);
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          console.log(self.state.getInvoice)
          if(childSnapshot.val().Receiver == self.state.getInvoice){
              console.log("Inme")
              self.setState({
                arrayOfData: [...self.state.arrayOfData,childSnapshot.val() ]
              })
              console.log("object")
              console.log(self.state.arrayOfData)
          }
        });
    });

}

// var userId = firebase.auth().currentUser.uid;
// firebase.database().ref("taxvisor-project-2").once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

            }
        })    
        }
    
        // componentDidMount() {
    
        //   fire.auth().onAuthStateChanged((user) => {
        //   if(user){
        //     if(localStorage.getItem('Username') == "null"){
        //       localStorage.setItem("Username",this.state.username)
        //     }
        //   }
        // })
        // }
        submit=(e)=>{
          let self = this
          e.preventDefault();
         console.log('hi')
         this.setState({text:""})
        
        
        
        }
        newFun(e){
          e.preventDefault();
  var user = firebase.auth().currentUser;
  
  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
  
         }
    
        toggleFullStory(name){
          this.setState({nulledState:true})
          var db = firebase.firestore();
          db.collection("stories").doc(name).update({
              show:true
            }).then(function() {
              console.log("Data Ojbect for new User created");
            });
            window.location.reload();
        }
    
    
        logout(){
          firebase.auth().signOut();
        }
        
        handleChange(e){
          this.setState({[e.target.name]: e.target.value});
      }




    render() {
        return (
            <div>
            {this.state.arrayOfData.map((value, index) => (<>
                <section class="bg-invoice bg-light">
            <div class="container">
                <div class="row mt-5 pt-4 pt-sm-0 justify-content-center">
                    <div class="col-lg-10">
                        <div class="p-4 shadow rounded bg-white">
                            <div class="invoice-top pb-4 border-bottom">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="logo-invoice mb-2">INVOICE WITH TAXVISOR<span class="text-primary">.</span></div>
                                        <a href="javascript:void(0)" class="text-primary h6"><i class="mdi mdi-link-variant text-muted mr-2"></i>www.taxvisor.corp</a>
                                    </div>

                                    <div class="col-md-4 mt-4 mt-sm-0">
                                        <h5>Sender :</h5>
                                        <dl class="row mb-0">
                                            <dt class="col-2 text-muted"><i class="mdi mdi-map-marker"></i></dt>
                                            <dd class="col-10 text-muted">
                                            </dd>

                                            <dd class="col-10 text-muted">
                                            Sender : <p class="mb-0">{value.Sender}</p>
                                            </dd> <dd class="col-10 text-muted">
                                            Email  :  <p class="mb-0">{value.Sender_Email}</p>

                                            </dd>
                                            <dd class="col-10 text-muted">
                                            GSTIN :  <p class="mb-0">{value.Sender_GST_IN}</p>

                                            </dd>

                                            {/* <dt class="col-2 text-muted"><i class="mdi mdi-phone"></i></dt> */}
                                            <dd class="col-10 text-muted">
                                              State : <a href="tel:+152534-468-854" class="text-muted">{value.Sender_State}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div class="invoice-middle py-4">
                                <h5>Receiver Details :</h5>
                                <div class="row mb-0">
                                    <div class="col-md-8 order-2 order-md-1">
                                        <dl class="row">
                                        {/* Receiver :<dt class="col-md-3 col-5 font-weight-normal">  {value.Receiver}</dt>
                                        Receiver Email :  <dd class="col-md-9 col-7 text-muted">  {value.Receiver_Email}</dd>
                                            
                                        Receiver GST_IN:   <dt class="col-md-3 col-5 font-weight-normal"> {value.Receiver_GST_IN}</dt>
                                        Receiver State: <dd class="col-md-9 col-7 text-muted">{value.Receiver_State}</dd> */}
                                        Invoice Status: <dd class="col-md-9 col-7 text-muted"> {value.status}</dd>
                                        </dl>
                                        
                                    </div>
                                    <div class="col-md-8 order-2 order-md-1">
                                        <dl class="row">
                                        {/* Receiver :<dt class="col-md-3 col-5 font-weight-normal">  {value.Receiver}</dt>
                                        Receiver Email :  <dd class="col-md-9 col-7 text-muted">  {value.Receiver_Email}</dd>
                                            
                                        Receiver GST_IN:   <dt class="col-md-3 col-5 font-weight-normal"> {value.Receiver_GST_IN}</dt>
                                        Receiver State: <dd class="col-md-9 col-7 text-muted">{value.Receiver_State}</dd> */}
                                        Receiver Email :  <dd class="col-md-9 col-7 text-muted">  {value.Receiver_Email}</dd>
                                        </dl>
                                        
                                    </div>
                                    <div class="col-md-8 order-2 order-md-1">
                                        <dl class="row">
                                        {/* Receiver :<dt class="col-md-3 col-5 font-weight-normal">  {value.Receiver}</dt>
                                        Receiver Email :  <dd class="col-md-9 col-7 text-muted">  {value.Receiver_Email}</dd>
                                            
                                        Receiver GST_IN:   <dt class="col-md-3 col-5 font-weight-normal"> {value.Receiver_GST_IN}</dt>
                                        Receiver State: <dd class="col-md-9 col-7 text-muted">{value.Receiver_State}</dd> */}
                                        Receiver GST_IN:   <dd class="col-md-9 col-7 text-muted"> {value.Receiver_GST_IN}</dd>
                                        </dl>
                                        
                                    </div>
                                    <div class="col-md-8 order-2 order-md-1">
                                        <dl class="row">
                                        {/* Receiver :<dt class="col-md-3 col-5 font-weight-normal">  {value.Receiver}</dt>
                                        Receiver Email :  <dd class="col-md-9 col-7 text-muted">  {value.Receiver_Email}</dd>
                                            
                                        Receiver GST_IN:   <dt class="col-md-3 col-5 font-weight-normal"> {value.Receiver_GST_IN}</dt>
                                        Receiver State: <dd class="col-md-9 col-7 text-muted">{value.Receiver_State}</dd> */}
                                        Receiver State: <dd class="col-md-9 col-7 text-muted">{value.Receiver_State}</dd>
                                        </dl>
                                        
                                    </div>
                              

                                </div>
                            </div>

                            <div class="invoice-table pb-4">
                                <div class="table-responsive bg-white shadow rounded">
                                    <table class="table mb-0 table-center invoice-tb">
                                        <thead class="bg-light">
                                            <tr>
                                                <th scope="col" class="text-left">No.</th>
                                                <th scope="col" class="text-left">Item</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total</th>
                                                {/* <th scope="col">Total</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" class="text-left">1</th>
                                                <td class="text-left">{value.Product_1}</td>
                                                <td>{value.Product_Quantity_1}</td>
                                                <td>$ {value.Product_Price_1 }</td>
                                                
                                            </tr>
                                            <tr>
                                            <th scope="row" class="text-left">2</th>
                                                <td class="text-left">{value.Product_2}</td>
                                                <td>{value.Product_Quantity_2}</td>
                                                <td>$ {value.Product_Price_2 }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="row">
                                    <div class="col-lg-4 col-md-5 ml-auto">
                                        <ul class="list-unstyled h5 font-weight-normal mt-4 mb-0">
                                            {/* <li class="text-muted">Subtotal :<span class="float-right">$ </span></li> */}
                                            <li class="text-muted">Taxes :<span class="float-right"> {value.taxRate} ( % )</span></li>
                                            <li>Total :<span class="float-right">$ {value.total}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="invoice-footer border-top pt-4">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="text-sm-left text-muted text-center">
                                            <h6 class="mb-0">Customer Services : <a href="tel:+152534-468-854" class="text-warning">(+12) 1546-456-856</a></h6>
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <div class="text-sm-right text-muted text-center">
                                            <h6 class="mb-0"><a href="page-terms.html" target="_blank" class="text-primary">Terms & Conditions</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    ))}          
           
            </div>
        )
    }
}

export default InvoiceDetails
