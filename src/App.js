import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import './App.css';

import List from './components/ListData/List';
import Header from './components/header/Header';

function App() {
  const [users, setUsers] = useState([])
  const [grouping, setgrouping] = useState(getFromLocalStorage() || 'status')
  const [ordering, setordering] = useState('title')
  const [ticketDetails, setticketDetails] = useState([]);

  const statusData = ['Backlog','Todo','In progress', 'Done', 'Cancelled']
  const priorityData = [{name:'No priority', priority: 0},{name:'Urgent', priority: 4}, {name:'High', priority: 3}, {name:'Medium', priority: 2}, {name:'Low', priority: 1}]


  const orderingData = useCallback(async (cardsArray) => {
    const sortFunctions = {
      priority: (a, b) => b.priority - a.priority,
      title: (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
    };
    const sortedArray = [...cardsArray].sort(sortFunctions[ordering] || (() => 0));
    await setticketDetails(sortedArray);
  }, [ordering]);
  

  function saveToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  function getFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null; 
  }

  useEffect(() => {
    saveToLocalStorage(grouping);
    async function fetchData() {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
       if(response !== undefined){
        const userData = response.data.users.map((user)=>user.name);
       setUsers(userData)
       }
      await refactorData(response);
  
    }
    fetchData();
    async function refactorData(response){
      let ticketArray = []
        if(response.status  === 200){
          for(let i=0; i<response.data.tickets.length; i++){
            for(let j=0; j<response.data.users.length; j++){
              if(response.data.tickets[i].userId === response.data.users[j].id){
                let ticketJson = {...response.data.tickets[i], userObj: response.data.users[j]}
                ticketArray.push(ticketJson)
              }
            }
          }
        }
      await setticketDetails(ticketArray)
      orderingData(ticketArray)
    }
    
  }, [orderingData, grouping])

  function handleGroupValue(value){
    setgrouping(value);
    //console.log(value);
  }

  function handleOrderValue(value){
    setordering(value);
    //console.log(value);
  }
  
  return (
    <>
      <Header
        groupValue={grouping}
        orderValue={ordering}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
      <div className="board-details-list">
  {(() => {
    if (grouping === 'status') {
      return (
        <>
          {statusData.map((listItem) => (
            <List
              key={listItem} 
              groupValue="status"
              orderValue={ordering}
              listTitle={listItem}
              statusList={statusData}
              ticketDetails={ticketDetails}
            />
          ))}
        </>
      );
    } else if (grouping === 'user') {
      return (
        <>
          {users.map((listItem) => (
            <List
              key={listItem}
              groupValue="user"
              orderValue={ordering}
              listTitle={listItem}
              userList={users}
              ticketDetails={ticketDetails}
            />
          ))}
        </>
      );
    } else if (grouping === 'priority') {
      return (
        <>
          {priorityData.map((listItem) => (
            <List
              key={listItem.priority} 
              groupValue="priority"
              orderValue={ordering}
              listTitle={listItem.priority}
              priorityList={priorityData}
              ticketDetails={ticketDetails}
            />
          ))}
        </>
      );
    } else {
      return null;
    }
  })()}
</div>

      </section>
    </>
  );
}

export default App;