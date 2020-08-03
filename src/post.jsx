import React, { Component} from 'react';
import './post.css'
const logo = require('./image.jpg');

class Publica extends Component {
    constructor (props) {

      super (props);
      this.postContent = props.postContent;
      this.postId = props.postId;
      this.name = props.name;
      this.foto = props.foto;
    }

handleRemove(id){
  
  this.props.removePublica(id);


}



 render (){

   return(

     <div className="Publica">
     <img src={this.foto} />

     <span className="botonEliminar"
     onClick={() => this.handleRemove(this.postId)}
     >&times; </span>
     <p className="name">{this.name}</p>
     <br/>
     <br/><br/>
     <span><p> {this.postContent} </p></span>

     </div>


   )
 }


}

export default Publica;
