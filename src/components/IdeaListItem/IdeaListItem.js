import React from 'react';
import styles from './IdeaListItem.module.css';
import Button from '../UI/Button/Button';
import {Link} from "react-router-dom";
import Rating from 'react-rating';

const ideaListItem = props => {
    return (
        <div className={styles.Idea}>
            <h1>{props.data.ideaData.title}</h1>
            <p><em>Description:</em> {props.data.ideaData.description}</p>
            <p><em>Category:</em> {props.data.ideaData.category}</p>
            <p><em>Expectations:</em> {props.data.ideaData.expectations}</p>
            <p><em>Date:</em> {props.data.ideaData.date} </p>
            <Rating
                stop='10'
                initialRating={props.data.ideaData.rating}
                readonly='true'/>
            <Button
                btnType='Success'
                clicked={props.updated}
                className={styles.Button}>
                <Link style={{textDecoration: 'none'}} to={'/' + props.data.id}>
                    Update Idea
                </Link>
            </Button>
            <Button
                btnType='Danger'
                clicked={props.clicked}
                className={styles.Button}>
                Delete Idea
            </Button>
        </div>
    );
};

export default ideaListItem;