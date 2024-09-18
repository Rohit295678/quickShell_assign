import React from "react";

import "./card.css";

export default function Card(props) {
  const colorArray = ['red','blue','purple','green','pink','brown','orange']
  const randomIndex = Math.floor(Math.random() * colorArray.length);
const randomColor = colorArray[randomIndex];
  return (
    <>
      <div className="card-container">
        <div className="card-id-wrapper">
          <div className="card-id">{props.cardDetails.id}</div>
          {props.groupValue!=='user' &&<div className={`card-profile`}
          style={{ backgroundColor: randomColor }}>
            <div className="card-profile-initial">
              {props.cardDetails.userObj.name[0]}
              {props.cardDetails.userObj.name[1]}
            </div>
            <div
              className={
                props.cardDetails.userObj.available
                  ? "card-profile-initial-available card-profile-initial-available-true"
                  : "card-profile-initial-available"
              }
            >
                </div> 
          </div>}
        </div>
        <div className="card-title">
        {(() => {
            if(props.groupValue !== 'status'){
            if (props.cardDetails.status === 'Backlog') {
              return (
                <div className="list-icon">
            <img src="/Backlog.svg" alt="Backlog_img" />
          </div>
              );
            } else if (props.cardDetails.status === 'Todo') {
              return (
                <div className="list-icon">
            <img src="/To-do.svg" alt="To-do_img" />
          </div>
              );
            } else if (props.cardDetails.status === 'In progress') {
              return (
                <div className="list-icon">
            <img src="/in-progress.svg" alt="in-progress_img" />
          </div>
              );
            } else if (props.cardDetails.status === 'Done') {
              return (
                <div className="list-icon">
            <img src="/Done.svg" alt="Done_img" />
          </div>
              );
            } else if (props.cardDetails.status === 'Cancelled') {
              return (
                <div className="list-icon">
            <img src="/Cancelled.svg" alt="Cancelled_img" />
          </div>
              );
            }
            return null;
        }
          })()} 
        
            {props.cardDetails.title}</div>
        <div className="card-tag">
          {(() => {
            if(props.groupValue !== 'priority'){
            if (props.cardDetails.priority === 0) {
              return (
                <div className="card-tag-icon">
                  <img src="/No-priority.svg" alt="No-priority_img" />
                </div>
              );
            } else if (props.cardDetails.priority === 4) {
              return (
                <div className="card-tag-icon">
                  <img src="/SVG - Urgent Priority colour.svg" alt="Urgent" />
                </div>
              );
            } else if (props.cardDetails.priority === 2) {
              return (
                <div className="card-tag-icon">
                  <img src="/Img - Medium Priority.svg" alt="Medium" />
                </div>
              );
            } else if (props.cardDetails.priority === 3) {
              return (
                <div className="card-tag-icon">
                  <img src="/Img - High Priority.svg" alt="High" />
                </div>
              );
            } else if (props.cardDetails.priority === 1) {
              return (
                <div className="card-tag-icon">
                  <img src="/Img - Low Priority.svg" alt="Low" />
                </div>
              );
            }
            return null;
        }
          })()}

          {props.cardDetails.tag.map((tag, index) => (
            <div key={index} className="card-tag-box">
              <div className="card-tag-title">{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
