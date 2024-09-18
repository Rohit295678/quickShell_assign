import React from 'react'

import './list.css'
import Card from '../card/Card';
//import ListY from '../Card/Card'

let cardCount = 0;

export default function List(props) {
    //console.log(props)
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
        return <>{props.listTitle}</>;
      }
      return null; 
    })()}
  </div>

  {/* Card count */}
  <div className="list-sum">{cardCount}</div>
</div>

                <div className="list-header-right">
                    <div className="list-add-item">
                    <img src='/add.svg' alt="add_img"/>
                    </div>
                    <div className="list-option-item">
                    <img src='/3 dot menu.svg' alt="menu_img"/>
                    </div>
                </div>
            </div>

            <div className="list-card-items">
                {
                    props.ticketDetails.map(ticket => {
                        if(ticket.status === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue} />)
                        }
                        else if(ticket.priority === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue}/>)
                        }
                        else if(ticket.userObj.name === props.listTitle){
                            cardCount++;
                            return(<Card cardDetails={ticket} groupValue={props.groupValue} />)
                        }
                        return null
                    }, cardCount = 0)
                    
                }
            </div>
        </div>
    </>
  )
}