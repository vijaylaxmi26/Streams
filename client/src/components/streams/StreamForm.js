import React from 'react';
import {Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{

    renderError({error,touched}){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }
             //formProps
    renderInput = ({input, label, meta} ) => {
        const classN = `field ${meta.error && meta.touched ? 'error' : ''}`;
        //console.log(meta.touched);
        return ( 
            <div className={classN}>
               <label>{label}</label>
               <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );

        /*(<input 
        onChange={formProps.input.onChange} 
        value={formProps.input.value}
        />);
        */
        //<input {...formProps.input} />
    }


    onSubmit = (formValues) => {
        //automaticaly called in redux form
        //event.preventDefualt();

        this.props.onSubmit(formValues);

    };

    render(){
        //Field itself don't know how to text output on the screen
        //it need a component
        //basically it connect our form to redux
         
        return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
           <Field name="title" component={this.renderInput} label="Enter Title"/>
           <Field name="description" component={this.renderInput} label="Enter discription" />
           <button className="ui button primary">Submit</button>
        </form>
        );
    }
}

const validate = (formValues) =>{
    const errors = {};
    if(!formValues.title){
     errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;

};
//reduxForm work as same connect function
export default reduxForm({
    form: 'streamForm',
    validate,
})(StreamForm);

 