import React from 'react';
import './sign-up.style.scss';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {signUpStart} from '../../redux/user/user.action';


class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
    }

    handleSubmit = async (event) => {

        const {signUpStart} = this.props
        event.preventDefault();
    
        const { displayName,email,password,confirmPassword } = this.state;

        if (password !== confirmPassword){
            alert("passwords dont match")
            return;
        }
    
        signUpStart({displayName,email,password})   
       
    }
    
    handleChange =(event) => {
        const {value,name} = event.target;
    
        this.setState({ [name]:value });
    }       
    



    render(){
        const { displayName,email,password,confirmPassword } = this.state;
        return( 
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with you email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label = 'Display NAme'
                        required
                    />
                        <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label = 'email'
                        required
                    />
                        <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label = 'Password'
                        required
                    />
                        <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label = 'Confirm password'
                        required
                    />                     
                    <CustomButton type='submit' >Sign Up</CustomButton>
                </form>

            </div>
            
        )
    }


}


const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp);