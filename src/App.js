import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';

const indexToMonth = index => {
  switch (index) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "";
  }
}

function App() {
  const [postsByMonth, setPostsByMonth] = useState(null);
  const onClick = async () => {
    try {
      const response = await fetch('/.netlify/functions/posts-by-month');
      const json = await response.json();
      setPostsByMonth(json);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <button onClick={onClick}>Fetch API</button>
      {postsByMonth && <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {Array(12).fill(0).map((el, i) => (
            <tr key={i}>
              <td>{indexToMonth(i)}</td>
              <td>{postsByMonth[i] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default App;
