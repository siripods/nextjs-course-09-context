import EventItem from "./event-item";
import classes from './events-search.module.css';
import Button from "../ui/button";
import { useRef } from "react";

function EventSearch(props) {
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;
        console.log(`selectedYear = ${selectedYear}`);
        console.log(`selectedMonth = ${selectedMonth}`);
        props.onSearch(selectedYear, selectedMonth);

    }    

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.controls}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={classes.controls}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <Button>Find Events</Button>
        </form>
    );
}

export default EventSearch;