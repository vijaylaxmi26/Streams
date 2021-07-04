import React from 'react';
import { connect } from 'react-redux';
import {signIn,signOut} from '../actions/index';

class GoogleAuth extends React.Component{

    //state= {isSignedIn: null};

    componentDidMount(){

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
               clientId: '185532324616-9md2o3f37mma3879slqg8tjttiasio1o.apps.googleusercontent.com',
               scope: 'email'
            }).then(() => {
                //get user logged in or not 
                this.auth = window.gapi.auth2.getAuthInstance();
                //this.setState({isSignedIn: this.auth.isSignedIn.get()});
                //this.onAuthChange();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
         
    }

    //helper methods
    /*//without redux
    onAuthChange = () => {
         this.setState({isSignedIn: this.auth.isSignedIn.get()});
    };
    */

    onAuthChange = (isSignedIn)  => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    };



    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };


    //console cammand for sign in or out
    //gapi.auth2.getAuthInstance().signIn()
    //gapi.auth2.getAuthInstance().signOut()

    //helper method
    renderAuthButton(){
        //this.state.isSignedIn === null
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
              <button onClick={this.onSignOutClick} className="ui red google button">
              <i className="google icon"/>
                Log out
              </button>
            );
        }

        return (
            <button onClick={this.onSignInClick} className="ui green google button">
            <i className="google icon"/>
              Log in
            </button>
          );
    }
    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}


const mapStateToProps = (state) =>{
    return {isSignedIn: state.auth.isSignedIn};
};
export default connect(
   mapStateToProps,
 {
    signIn,
    signOut
})(GoogleAuth);