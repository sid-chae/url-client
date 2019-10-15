import React,{Component} from 'react';

class InputField extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="user-input">
                <input placeholder="Enter your url" id="realUrl" type="text" className="validate"/>
                <button onClick={()=>
                    this.props.checkDuplicateEntries(document.getElementById("realUrl").value)}>Generate new Url</button>
                <br/>
                {this.props.realUrl && this.props.newUrl && (<><h1>Your Url: {this.props.realUrl}</h1>
                <h1>Generated Url: {this.props.newUrl}</h1></>)}
                    </div>);

    }
};

export default InputField;