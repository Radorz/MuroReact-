import React, { Component } from "react";
import './App.css';
import withFirebaseAuth from 'react-with-firebase-auth';

import firebase from 'firebase';
import {DB_CONFIG} from './config/config.js';
import 'firebase/database';

import Note from './post.jsx';
import NoteForm from './NoteForm.jsx'


class App extends Component {

         constructor (){
            super();


           this.state = {
name: "Usuario",
  user:null,
  foto:null,

             publicas: [


               
              ]


           };

           this.app = firebase.initializeApp(DB_CONFIG);
          this.db = this.app.database().ref().child('publicas');

           this.addPost = this.addPost.bind(this);
           this.removePublica = this.removePublica.bind(this);
         }

componentWillMount(){

  firebase.auth().onAuthStateChanged(user => {
    this.setState({ user });
    var user = firebase.auth().currentUser;

if (user != null) {
  this.state.name = user.displayName;
  this.state.foto = user.photoURL;
}
  });
}
handleAuthout(){
  firebase.auth().signOut().then(function() {
alert("Desconectado correctamente")
this.state.name= "Usuario";

  }).catch(function(error) {
    // An error happened.
  });
}
 handleAuth(){
 
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then(result =>{ console.log(`${result.user.email}`)})
  .catch(error => console.log (`Error ${error.code}: $(error.message)`));

}
         componentDidMount() {
          const { publicas } = this.state;
           this.db.on('child_added', snap =>{
             publicas.push({
               postId: snap.key,
               postContent: snap.val().postContent,
               name :snap.val().name,
               foto: snap.val().foto,
             })
             this.setState({publicas});
           });

           this.db.on('child_removed', snap => { for (let i = 0 ; i < publicas.length ; i++) {
             if (publicas[i].postId = snap.key) {
               publicas.splice(i, 1);

             }
           }
           this.setState ({publicas});
           });
         }

         removePublica(postId){

  this.db.child(postId).remove();
         }


         addPost(publica){
 
          var user = firebase.auth().currentUser;


       if (user){
           this.db.push().set({postContent: publica,name:this.state.name, foto: this.state.foto});

         }

      else {

           alert("No Estas Registrado");
        

          }
       }


  render() {
    return (

      <div className="publicaContainer">

      <div id="notesHeader" className="publicaHeader">
       <h1> Muro interactivo </h1>
       <h1> Hola {this.state.name} </h1>

    <button  className="BotonRegistro" onClick={this.handleAuth}> Iniciar Sesion</button>
    <button  className="BotonRegistro" onClick={this.handleAuthout}>Desconectarse</button>
        </div>
      <div id="publicaFooter" className="publicaFooter">
<NoteForm addPost= {this.addPost}/>
 </div>

        <div id= "publicaBody" className="publicaBody">
        <ul>
       {
          this.state.publicas.map(publica=> {
            return (
              <Note
              postContent={publica.postContent}
              postId={publica.postId}
              name= {publica.name}
              foto= {publica.foto}
              key={publica.postId}
              removePublica={this.removePublica}
              />
            )
          })
        }
       </ul>
        </div>


      </div>
    );
  }
}

export default App;
