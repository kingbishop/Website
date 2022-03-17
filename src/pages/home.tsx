import ScrollPage from '../components/ScrollPage';

import '../styles/home.css'


function Home() {


    const InitialPage = () => {
        return (

            <div className='flex-center-row font-data'>
                <div>
                    <p>Hi, my name is</p>
                    <h1>Caleb Bishop</h1>
                    <p>Software Engineer, Gamer, Blockchain Enthusiast, and all things exciting!</p>
                </div>
            </div>
        )
    }

    const JourneyPage = () => {
        return (
            <div className='flex-center-row font-data'>
                <div>
                    <h1>ABOUT ME</h1>
                    <p></p>
                </div>

                <div>
                    <img src='profile.jpeg'/>
                </div>
            </div>
            
        )
    }

    const ExperiencePage = () => {
        return (
            <div className='flex-center-row font-data'>
                <div>
                    <h1>The Experience</h1>
                </div>
            </div>
        )
    }

    const ContactPage = () => {
        return (
            <div className='flex-center-row font-data'>
                <div>
                    <h1>The Socials</h1>
                </div>
            </div>
        )
    }




    return (
        <>
            <div>


                <ScrollPage pages={[<InitialPage />, <JourneyPage />, <ExperiencePage />, <ContactPage />]}></ScrollPage>


                <div className='avatar' >
                    <img src='Avatar.png' />
                </div>



            </div>
            <div className='bottom-note font-data neon-hover'>
                <div>
                    <p>
                        SCROLL TO LIVE!
                    </p>
                </div>

            </div>
        </>
    )
}

export default Home