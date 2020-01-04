import React, {Component} from 'react';
import * as emailjs from 'emailjs-com';

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: '',
            errors: {
                contactName: null,
                contactEmail: null,
                contactSubject: null,
                contactMessage: null
            },
            formValid: false,
            errorCount: null,
            formSubmitAttempt: 0,
            formSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.countErrors = this.countErrors.bind(this);
    }

    componentDidMount() {
        console.log(this)
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => (val === null || val.length > 0) && (valid = false)
        );

        return valid;
    }

    countErrors = (errors) => {
        let count = 0;
        Object.values(errors).forEach(
            (val) => (val === null || val.length > 0) && (count = count+1)
        );
        return count;
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state['errors'];

        switch (name) {
            case 'contactName':
                errors.contactName =
                    value.length === 0
                        ? 'Name cannot be empty!'
                        : '';
                break;
            case 'contactEmail':
                errors.contactEmail =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'contactSubject':
                errors.contactSubject =
                    value.length === 0
                        ? 'Subject cannot be empty!'
                        : '';
                break;
            case 'contactMessage':
                errors.contactMessage =
                    value.length === 0
                        ? 'Message cannot be empty!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [e.target.name]: e.target.value,
                            formValid: this.validateForm(this.state.errors),
                            errorCount: this.countErrors(this.state.errors)})
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log('Validating form')
        this.setState({formValid: this.validateForm(this.state.errors),
                            errorCount: this.countErrors(this.state.errors),
                            formSubmitAttempt: this.state.formSubmitAttempt + 1})

        if(this.state.formValid && !this.state.formSubmitted) {
            console.info('Valid Form; sending email')

            emailjs.send(
                'gmail', 'template_moZABJMy',
                {from_name: this.state.contactName,
                                from_email: this.state.contactEmail,
                                subject: this.state.contactSubject,
                                message_html: this.state.contactMessage
                },
                'user_UpKZMAyS3KwQoOhmVm3Re'
            ).then(res => {
                console.log('Email successfully sent!')
                this.setState({['formSubmitted']: true})
            }).catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

        }else{
            console.error('Invalid Form')
        }
    }

    render() {

        if (this.props.data) {
            var message = this.props.data.contactmessage;

        }
        const {errors, formValid, formSubmitted, formSubmitAttempt, errorCount} = this.state;
        return (
            <section id="contact">
                <div className="row section-head">
                    <div className="two columns header-col">
                        <h1><span>Get In Touch.</span></h1>
                    </div>
                    <div className="ten columns">
                        <p className="lead">{message}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="eight columns">
                        <form onSubmit={this.handleSubmit} id="contactForm" name="contactForm">
                            <fieldset>
                                <div>
                                    <label htmlFor="contactName">Name <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactName" name="contactName"
                                           onChange={this.handleChange}/>
                                    <span style={{display: 'inline-block', width: '26%'}}/>
                                    <span className='message-warning'>{(errors.contactName === null
                                                                        || errors.contactName.length > 0)
                                                                        ? errors.contactName
                                                                        : ''}
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail"
                                           onChange={this.handleChange}/>
                                    <span style={{display: 'inline-block', width: '26%'}}/>
                                    <span className='message-warning'>{(errors.contactEmail === null
                                                                        || errors.contactEmail.length > 0)
                                                                        ? errors.contactEmail
                                                                        : ''}
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor="contactSubject">Subject <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactSubject"
                                           name="contactSubject" onChange={this.handleChange}/>
                                    <span style={{display: 'inline-block', width: '26%'}}/>
                                    <span className='message-warning'>{(errors.contactSubject === null
                                                                        || errors.contactSubject.length > 0)
                                                                        ? errors.contactSubject
                                                                        : ''}
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                                    <textarea type="textarea" id="contactMessage"
                                           name="contactMessage" onChange={this.handleChange}/>
                                    <span style={{display: 'inline-block', width: '26%'}}/>
                                    <span className='message-warning'>{(errors.contactMessage=== null
                                                                        || errors.contactMessage.length > 0)
                                                                        ? errors.contactMessage
                                                                        : ''}
                                    </span>
                                </div>
                                <div className='row'>
                                    <button className="submit" onClick={this.handleSubmit}>Submit</button>
                                    <span style={{display:'inline-block', width:'10px'}}/>
                                    {(errorCount !== null
                                        && formSubmitAttempt > 0
                                        && !formSubmitted)
                                        ? <span className="message-success">Form is {formValid
                                                                                    ? 'ready to submit!'
                                                                                    : 'invalid ❌'}</span>
                                        : (formSubmitted
                                            ? <span className="message-success">✅ Form is submitted! Refresh to send another!</span>
                                            : 'Form not submitted')}
                                </div>


                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        );
    }

}

export default Contact;
