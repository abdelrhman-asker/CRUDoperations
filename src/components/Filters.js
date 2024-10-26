import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../features/tasks/taskSlice';

const Filters = () => {
  const dispatch = useDispatch();

  const handleStateFilter = (state) => {
    dispatch(setFilter({ state }));
  };

  const handlePriorityFilter = (priority) => {
    dispatch(setFilter({ priority }));
  };

  const handleSearch = (event) => {
    dispatch(setFilter({ search: event.target.value }));
  };

  return (
    <div className='Filters'>
      <select onChange={(e) => handleStateFilter(e.target.value)}>
        <option value="all">All States</option>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <select onChange={(e) => handlePriorityFilter(e.target.value)}>
        <option value="all">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="text" placeholder="Search by name" onChange={handleSearch} />
    </div>
  );
};

export default Filters;
