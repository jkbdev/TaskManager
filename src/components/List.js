import React from 'react';
import {FaEdit, FaTrash} from "react-icons/fa";
import { BsCheck2Circle, BsFillTrash3Fill, BsPencilSquare} from "react-icons/bs";

const List = ({items, removeItem, editItem, doneItem}) => {
    return (
        <div classname="container">
            {items.map((item) => {
                const {id, title, done} = item;
                const completedStyle = {
                    textDecoration: done ? 'line-through' : 'none',
                    color: done ? 'grey' : 'black',
                    fontStyle: done ? 'italic' : 'normal'
                };
                return (
                    <ul className="list-group list-group-flush" key={id}>
                        <li className="list-group-item border rounded d-flex justify-content-between align-items-center">
                        <span style={completedStyle}>
                                {title}
                            </span>
                        <div style={{float: "right"}}>
                            <button type="button" className="done-btn" onClick={() => doneItem(id)}>
                            <BsCheck2Circle />
                            </button>
                            <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                            <BsPencilSquare />
                            </button>
                            <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                            <BsFillTrash3Fill />
                            </button>
                        </div>
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

export default List