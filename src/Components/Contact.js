import React, {Component} from 'react';
import * as emailjs from 'emailjs-com';

class Contact extends Component {
    constructor(props) {
        super(props)

        this.setState({
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: ''
        })

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        console.log(this)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log('we in submit')

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
            contactMessage: ''
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
                                    <label htmlFor="contactSubject">Subject</label>
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
