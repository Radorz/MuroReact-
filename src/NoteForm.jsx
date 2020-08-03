import React, { Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component {
constructor (){
  super();
this.addPost= this.addPost.bind(this);

}

addPost(){

  this.props.addPost(this.textInput.value);
  this.textInput.value = '';

}

render(){

return(
<div className="PublicForm">

<input
ref={input => {this.textInput = input;}}
  placeholder="Escribe lo que estas pensando"
 type="text"/>

<button
onClick={this.addPost}
>
Publicar
</button>
</div>
)
}

}

export default NoteForm;
