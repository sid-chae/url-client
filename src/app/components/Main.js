import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {Router, Route} from 'react-router-dom';
import {history} from '../store/history';
import UrlContainer from './UrlContainer';
import { getUrlMappings} from '../services';
import RedirectingComponent from './RedirectingComponent';

export class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            hideSite: false,
        }
    }

    shouldComponentUpdate( nextState){
        return this.state.url!==nextState.url
    }

    hideSite = (hide)=>{
        this.setState({hideSite:hide});
    }

    urlCalculator=async (url)=>{
        let splitUrl = url.split('new');
        let id = splitUrl[1].replace('/','');
        let realUrl = await getUrlMappings(id);
        this.setState({url:realUrl.replace('www.','//' )})
        return realUrl.replace('www.','//' );
    }

    render(){
        return(<>
                <Router history={history}>
                <Provider store={store}>
                    <div>
                        {!this.state.hideSite && (
                            <><UrlContainer hideSite={this.hideSite}/>
                            <Route path='/new/:id' render={()=><RedirectingComponent hideSite={this.hideSite} urlCalculator={this.urlCalculator} location={window.location.href}/>}/>
                            </>)}
                    </div>
                </Provider>
                </Router></>
        )
    }
}