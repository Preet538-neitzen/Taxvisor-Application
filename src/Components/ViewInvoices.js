import React, { Component } from 'react'
import Header from '../UpAndDown.js/Header'
import fire from '.././Config/Config'
import firebase, { database } from 'firebase/app' 

export class ViewInvoices extends Component { constructor(props){
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
      invoiceList:[],
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
            var data = firebase.database();
if(user){
  
       let self = this;
    var leadsRef = data.ref(user.uid);
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          if(childSnapshot.val().Receiver == "211221"){
              self.setState({
                arrayOfData: [...self.state.arrayOfData,childSnapshot.val() ]
              })
              console.log(self.state.arrayOfData)
          }
          self.setState({
            invoiceList: [...self.state.invoiceList,childSnapshot.val() ]
          })
          console.log(childData.Product_1);
          console.log(self.state.invoiceList)
        });
    });


 
}


      let self = this;
      var db = firebase.firestore();
      db.collection("stories").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data().story);
            self.setState(prevState => ({
              newDataObj: {                   // object that we want to update
                  ...prevState.newDataObj,    // keep all other key-value pairs
                  name: doc.id,
                  story:doc.data().story,
                  storyDescription:doc.data().storyDescription,
                  bool: doc.data().show ,
                  likes:100  ,
                  show:doc.data().show    // update the value of specific key
              },
          }))
          self.setState({ allStories: [...self.state.allStories,self.state.newDataObj ] }) //simple value
          // self.setState({newDataObj:doc.id=doc.data()})
          console.log(self.state.allStories)
      
          
            self.setState({ peopleId: [...self.state.peopleId, doc.id ] }) //simple value
            self.setState({storyDescription : doc.data().storyDescription})
                
        }); 
  
        
    });   


   
    
    
        }
      });

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

  invoiceRoute=(invoiceQuery)=>{
    var db = firebase.firestore();
    db.collection("currentInvoice").doc("currentInvoice").update({
        currentOpen:invoiceQuery
      }).then(function() {
        console.log("Data Ojbect for new User created");
      });
  }
    
    render() {
        return (
            <div>
                <Header name={"Preet"}/>
            <section class="section border-top">
     
            <div class="container" style={{paddingTop:'250px'}}>
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <div class="table-responsive crypto-table bg-white shadow rounded">
                            <table class="table mb-0 table-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sender</th>
                                        <th scope="col">Receiver</th>
                                        <th scope="col" style={{maxWidth: "150px"}}>Price</th>
                                        <th scope="col" style={{maxWidth: "150px"}}>Tax Rate</th>
                                        <th scope="col" style={{maxWidth: "150px"}}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.invoiceList.map((invoice, index) => (<>
                                    <tr >

<td href="/InvoiceDetails" onClick={()=>this.invoiceRoute(invoice.Receiver)} scope="row">{invoice.Sender}</td>
<th>
    <img src="images\crypto\litecoin.png" class="float-left mr-3" height="50" alt=""/>
    <p class="mt-2 mb-0 font-weight-normal h5">{invoice.Receiver} <span class="text-muted h6">LTC</span> </p>
</th>
<td>{invoice.total}</td>
<td class="text-success">{invoice.taxRate}</td>
<td><a href="javascript:void(0)" class="btn btn-primary">{invoice.status}</a></td>
</tr>
       </>
    ))}            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
      
            <div class="container mt-100 mt-60">
                <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <div class="section-title mb-4 pb-2">
                            <h4 class="title mb-4">How it works ?</h4>
                            <p class="text-muted para-desc mb-0 mx-auto">Start working with <span class="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3 col-12 mt-4 pt-2">
                        <div class="text-center">
                            <div class="rounded p-4 shadow">
                                <a href="javascript:void(0)"><img src="images\crypto\1.png" height="100" class="mx-auto d-block" alt=""/></a>
                            </div>
    
                            <div class="mt-3">
                                <h5><a href="javascript:void(0)" class="text-primary">Create Account</a></h5>
                                <p class="text-muted mb-0">Earn upto 10%</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 col-12 mt-4 pt-2">
                        <div class="text-center">
                            <div class="rounded p-4 shadow">
                                <a href="javascript:void(0)"><img src="images\crypto\2.png" height="100" class="mx-auto d-block" alt=""/></a>
                            </div>
    
                            <div class="mt-3">
                                <h5><a href="javascript:void(0)" class="text-primary">Buy Coin</a></h5>
                                <p class="text-muted mb-0">Save upto $50/coin</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 col-12 mt-4 pt-2">
                        <div class="text-center">
                            <div class="rounded p-4 shadow">
                                <a href="javascript:void(0)"><img src="images\crypto\3.png" height="100" class="mx-auto d-block" alt=""/></a>
                            </div>
    
                            <div class="mt-3">
                                <h5><a href="javascript:void(0)" class="text-primary">Loans</a></h5>
                                <p class="text-muted mb-0">Use crypto as collateral</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-12 mt-4 pt-2">
                        <div class="text-center">
                            <div class="rounded p-4 shadow">
                                <a href="javascript:void(0)"><img src="images\crypto\4.png" height="100" class="mx-auto d-block" alt=""/></a>
                            </div>
    
                            <div class="mt-3">
                                <h5><a href="javascript:void(0)" class="text-primary">Credit &amp; Debit Cards</a></h5>
                                <p class="text-muted mb-0">Payments with cards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </section>
            </div>
        )
    }
}

export default ViewInvoices
