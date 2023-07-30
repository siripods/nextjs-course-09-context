import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { Fragment } from 'react';
import Head from 'next/head';

function AllEventsPage(props) {
    const router = useRouter();
    //const events = getAllEvents();
    //const events = props.allEvents;
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find a lot of greate evnets that allow you to evolve...">
                </meta>
            </Head>
            
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />

        </Fragment>
        
    );
}

export default AllEventsPage;

export async function getStaticProps(context) {
    console.log("--- index.js - getStaticProps---------");
    //get featured events data from Firebase database
    const events = await getAllEvents();
    return {
        props: {
            events: events
        }
        ,revalidate: 60
    }
}