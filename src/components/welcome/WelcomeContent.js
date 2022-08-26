import React from 'react'
import "../../asset/css/welcome.css"
import secureImage from '../../asset/images/secure.png'
import simpleImage from '../../asset/images/simple.png'
import learnImage from '../../asset/images/learn.png'

const WelcomeContent = () => {
    return (
        <div className='about mt-5 mb-5 container' id="about">
            <h1 className='mb-3'><strong>About</strong></h1>
            <span>My Simple Todoapp is an app that will help you organize your work and life easier.</span>
            <span>We will keep make this app better and user friendly</span>
            <span className='line mt-5 mb-5' />
            <div className='positive'>
                <div className='positive-text'>
                    <h3>We are priority your privacy</h3>
                    <p>we make sure every task you make will be secure by your user authentication, so other people can't access your task</p>
                </div>
                <div className='positive-img'>
                    <img alt="secure" src={secureImage} />
                </div>
            </div>
            <div className='positive'>
                <div className='positive-img'>
                    <img alt="simple" src={simpleImage} />
                </div>
                <div className='positive-text'>
                    <h3>We are priority the way you organize</h3>
                    <p>we make sure every task you make will easy view and make your work and life easier</p>
                </div>
            </div>
            <div className='positive'>
                <div className='positive-text'>
                    <h3>We are priority your experience</h3>
                    <p>we make sure everything you do here is easy to learn and easy to use</p>
                </div>
                <div className='positive-img'>
                    <img alt="learn" src={learnImage} />
                </div>
            </div>
            <div className='contact mt-5 mb-5' id="contact">
                <div className='contact-information'>
                    <h1><strong>Contact Information</strong></h1>
                    <p>Feel free to contact us for any suggestion or problem</p>
                    <span className='line mt-2 mb-2' />
                    <a>
                        <img alt="email" src="https://img.icons8.com/ios-glyphs/color/40/000000/new-post.png" />
                        <span className='social'>Email</span>
                    </a>
                    <a>
                        <img alt="instagram" src="https://img.icons8.com/ios-glyphs/color/40/000000/instagram-new--v1.png" />
                        <span className='social'>Instagram</span>
                    </a>
                    <a>
                        <img alt="github" src="https://img.icons8.com/ios-glyphs/40/000000/github.png" />
                        <span className='social'>Github</span>
                    </a>
                    <a>
                        <img alt="linkedin" src="https://img.icons8.com/ios-glyphs/40/000000/linkedin.png" />
                        <span className='social'>Linkedin</span>
                    </a>
                </div>
                <form className='contact-form'>
                    <label htmlFor='name'>Name :</label>
                    <input type="text" className='form-control' />
                    <label htmlFor='email'>Email :</label>
                    <input type="email" className="form-control" />
                    <label htmlFor='subject'>Subject :</label>
                    <input type="text" className='form-control' />
                    <label htmlFor='message'>Message :</label>
                    <textarea className='form-control' />
                    <button className='btn btn-outline-dark'>Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default WelcomeContent