import React,{Component} from 'react';

class RedirectingComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            redirect:false,
            url:''
        }
    }

    async componentDidMount(){
        let realUrl = await this.props.urlCalculator(this.props.location);
        this.setState({url: realUrl, redirect:true});

    }

    shouldComponentUpdate(nextState,nextProps){
        return this.props.location!==nextProps.location || this.state.redirect!==nextState.redirect || this.state.url!==nextState.url;
    }

    render(){
        if(this.state.redirect){
            this.props.hideSite(true);
            console.log(this.state.url)
            window.location.href=this.state.url;
        }
        return(
        <><h1> redirecting component</h1></>
        )
}};

export default RedirectingComponent;