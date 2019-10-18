import React,{Component} from 'react';
import  InputField  from './InputField';
import {storeUrlMappings,checkForExistingUrl,checkForExistingId } from '../services';

export const api='https://s95.herokuapp.com';
class UrlContainer extends Component{
    constructor(props){
        super(props);
            this.state={
                    currentNewUrl:'',
                    currentUrl:'',
                }
    }

    componentDidMount(){
        this.props.hideSite(false)
    }

    getUniqueUrl = ()=>{
        let uuid = Math.random().toString(36).substring(9);
        return uuid;
    }

    checkDuplicateEntries = async (realUrl) =>{
        let existingEntries = await checkForExistingUrl(realUrl);
        if(existingEntries.length){
            console.log(existingEntries)
            this.setState({currentUrl:realUrl, currentNewUrl:existingEntries[0].newUrl})
        } else{
            this.generateNewUrl(realUrl);
        }
    }

    generateNewUrl = input =>{
        this.setState({currentUrl:input});
        let idExists=true;
        let uniqueValue;
        while(idExists){
            uniqueValue = this.getUniqueUrl();
            let res= checkForExistingId({id: uniqueValue});
            if(!res.length)
                idExists=false;
        }
        let currentProxiedUrl = `${api}/new/${uniqueValue}`;
        this.setState({currentNewUrl:currentProxiedUrl});
        const urlMapping = {id: uniqueValue, realUrl: input, newUrl: currentProxiedUrl};
        storeUrlMappings(urlMapping);
    }

    render(){
        return(
            <div>
                <InputField checkDuplicateEntries={this.checkDuplicateEntries} realUrl={this.state.currentUrl} newUrl={this.state.currentNewUrl}/>
            </div>);

    }
};

export default UrlContainer;