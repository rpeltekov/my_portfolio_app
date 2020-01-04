import React, {Component} from 'react';
import * as emailjs from 'emailjs-com';

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Contact extends Component {
    constructor(props) {
        super(props);
        console.log("constructor called")

        this.state = {
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: '',
            errors: {
                contactName: '',
                contactEmail: '',
                contactSubject: '',
                contactMessage: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        console.log(this)
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
        this.setState({errors, [e.target.name]: e.target.value}, () => {
            console.log(errors)
        })
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        
        return valid;
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log('submitting form')

        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form')
        }else{
            console.error('Invalid Form')
        }

        emailjs.send(
            'gmail', 'template_moZABJMy',
            {from_name: this.state.contactName, from_email: this.state.contactEmail, subject: this.state.contactSubject, message_html: this.state.contactMessage},
            'user_UpKZMAyS3KwQoOhmVm3Re'
        ).then(res => {
            console.log('Email successfully sent!')
        }).catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

        this.setState({
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: '',
            errors: {
                contactName: '',
                contactEmail: '',
                contactSubject: '',
                contactMessage: ''
            }
        })
    }

    render() {

        if (this.props.data) {
            var message = this.props.data.contactmessage;
        }

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
                                </div>
                                <div>
                                    <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail"
                                           onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="contactSubject">Subject <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactSubject"
                                           name="contactSubject" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                                    <textarea type="textarea" id="contactMessage"
                                           name="contactMessage" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <button className="submit" onClick={this.handleSubmit}>Submit</button>
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
