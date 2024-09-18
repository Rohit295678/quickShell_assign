import React from 'react';
import './list.css';
import Card from '../card/Card';

export default function List(props) {
    const colorArray = ['red','blue','purple','green','pink','brown','orange']
  const randomIndex = Math.floor(Math.random() * colorArray.length);
const randomColor = colorArray[randomIndex];
  const filteredTickets = props.ticketDetails.filter(ticket => {
    if (props.groupValue === 'status' && ticket.status === props.listTitle) {
      return true;
    }
    if (props.groupValue === 'priority' && ticket.priority === props.listTitle) {
      return true;
    }
    if (props.groupValue === 'user' && ticket.userObj.name === props.listTitle) {
      return true;
    }
    return false;
  });
  const cardCount = filteredTickets.length;

  
  

  return (
    <>
      <div className="list-container">
        <div className="list-header">
          <div className="list-header-left">
            {(() => {
              if (props.groupValue === 'status') {
                if (props.listTitle === 'Backlog') {
                  return (
                    <div className="list-icon">
                      <img src="/Backlog.svg" alt="Backlog_img" />
                    </div>
                  );
                } else if (props.listTitle === 'Todo') {
                  return (
                    <div className="list-icon">
                      <img src="/To-do.svg" alt="To-do_img" />
                    </div>
                  );
                } else if (props.listTitle === 'In progress') {
                  return (
                    <div className="list-icon">
                      <img src="/in-progress.svg" alt="in-progress_img" />
                    </div>
                  );
                } else if (props.listTitle === 'Done') {
                  return (
                    <div className="list-icon">
                      <img src="/Done.svg" alt="Done_img" />
                    </div>
                  );
                } else if (props.listTitle === 'Cancelled') {
                  return (
                    <div className="list-icon">
                      <img src="/Cancelled.svg" alt="Cancelled_img" />
                    </div>
                  );
                }
              } else if (props.groupValue === 'priority') {
                if (props.listTitle === 0) {
                  return (
                    <div className="card-tag-icon">
                      <img src="/No-priority.svg" alt="No-priority_img" />
                    </div>
                  );
                } else if (props.listTitle === 4) {
                  return (
                    <div className="card-tag-icon">
                      <img src="/SVG - Urgent Priority colour.svg" alt="Urgent" />
                    </div>
                  );
                } else if (props.listTitle === 2) {
                  return (
                    <div className="card-tag-icon">
                      <img src="/Img - Medium Priority.svg" alt="Medium" />
                    </div>
                  );
                } else if (props.listTitle === 3) {
                  return (
                    <div className="card-tag-icon">
                      <img src="/Img - High Priority.svg" alt="High" />
                    </div>
                  );
                } else if (props.listTitle === 1) {
                  return (
                    <div className="card-tag-icon">
                      <img src="/Img - Low Priority.svg" alt="Low" />
                    </div>
                  );
                }
              } else if (props.groupValue === 'user') {
                return <></>;
              }
              return null;
            })()}

            <div className="list-title">
              {(() => {
                if (props.groupValue === 'priority') {
                  return props.priorityList
                    ? props.priorityList.map((priorityProperty) =>
                        priorityProperty.priority === props.listTitle ? (
                          <>{priorityProperty.name}</>
                        ) : null
                      )
                    : null;
                } else if (props.groupValue === 'status') {
                  return <>{props.listTitle}</>;
                } else if (props.groupValue === 'user') {
                  return <><div className="disp_Name"><div className={`card-profile`}
                  style={{ backgroundColor: randomColor }}>
                    <div className="card-profile-initial">
                      {props.listTitle[0]}
                      {props.listTitle[1]}
                    </div>
                    <div
                      className={
                        props.userAvailable
                          ? "card-profile-initial-available card-profile-initial-available-true"
                          : "card-profile-initial-available"
                      }
                    >
                        </div> 
                  </div><p>{props.listTitle}</p></div></>;
                }
                return null;
              })()}
            </div>

            {/* Card count */}
            <div className="list-sum">{cardCount}</div>
          </div>
            
          <div className="list-header-right">
            <div className="list-add-item">
              <img src="/add.svg" alt="add_img" />
            </div>
            <div className="list-option-item">
              <img src="/3 dot menu.svg" alt="menu_img" />
            </div>
          </div>
          
        </div>

        <div className="list-card-items">
          {filteredTickets.map(ticket => (
            <Card key={ticket.id} cardDetails={ticket} groupValue={props.groupValue} />
          ))}
        </div>
        
      </div>
    </>
  );
}
