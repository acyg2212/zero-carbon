import React from 'react';

const ContactUs = () => {

    return (
        <div className="constact-us-div">
            <h2 className="contact-us-header">Contact Us</h2>
            <div className='contact-us-single-line'>
                <div>Tyna William</div>
                <a className="contact-us-link" href="https://github.com/tynawilliam">
                    <div><i class="fab fa-github"></i></div>
                </a>
                <a className="contact-us-link" href="https://www.linkedin.com/in/tynadwilliam/">
                    <div><i class="fab fa-linkedin"></i></div>
                </a>
            </div>

            <div className='contact-us-single-line'>
                <div>Aaron Cygnarowicz</div>
                <a className="contact-us-link" href="https://github.com/acyg2212">
                    <div><i class="fab fa-github"></i></div>
                </a>
                <a className="contact-us-link" href="https://www.linkedin.com/in/aaron-cygnarowicz-13806450/">
                    <div><i class="fab fa-linkedin"></i></div>
                </a>
            </div>

        </div>
    )

}

export default ContactUs;