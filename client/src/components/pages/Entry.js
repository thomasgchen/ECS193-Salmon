import React from 'react';
import { Link } from 'react-router-dom';

export default function Entry() {
  return (
    <div>
      <p>Entry</p>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/entry">Data Entry</Link>
        </li>
        <li>
          <Link to="/explorer">Data Explorer</Link>
        </li>
      </ul>
    </div>
  );
}
