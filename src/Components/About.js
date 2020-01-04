import React, {Component} from 'react';

class About extends Component {
    render() {

        if (this.props.data) {
            var profilepic = "images/" + this.props.data.image2;
            var bio = this.props.data.bio;
            var resumeDownload = "files/" + this.props.data.resumedownload;
        }

        return (
            <section id="about">
                <div className="row">
                    <div className="three columns">
                        <img className="profile-pic" src={profilepic} alt="Robert Peltekov Profile Pic"/>
                    </div>
                    <div className="nine columns main-col">
                        <h2>About Me</h2>

                        <p>{bio}</p>
                        <div className="row">
                            <div className="columns download">
                                <p>
                                    <a href={resumeDownload} className="button"><i className="fa fa-download"/>Download
                                        Resume</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default About;
