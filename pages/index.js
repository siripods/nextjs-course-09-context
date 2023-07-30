//import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
    
    return (
        <div>
            <Head>
                <title>Next JS Events</title>
                <meta name="description" content="Find a lot of greate evnets that allow you to evolve...">
                </meta>
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events} />
        </div>
    );
}

//because we do not need to pre-render it for every request, we use getStaticProps
//this function returns an object with the props for this homepage component
export async function getStaticProps(context) {
    console.log("--- index.js - getStaticProps---------");
    //get featured events data from Firebase database
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        }
        ,revalidate: 10
    }
}

export default HomePage;