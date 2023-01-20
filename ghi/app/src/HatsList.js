// import { useEffect, useState } from 'react';

// function HatsList() {
//   const [hats, setHats] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const response = await fetch("http://localhost:8090/api/hats/");

//       if (response.ok) {
//         const data = await response.json();
//         setHats(data.hats);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <table className="table table-dark table-striped">
//       <thead>
//         <tr>
//           <th>Style Name</th>
//           <th>Fabric</th>
//           <th>Color</th>
//           <th>Location</th>
//         </tr>
//       </thead>
//       <tbody>
//         {hats.map((hat) => {
//           return (
//             <tr key={hat.href}>
//               <td>{hat.style_name}</td>
//               <td>{hat.fabric}</td>
//               <td>{hat.color}</td>
//               <td>{hat.location}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }
// export default HatsList;

import { useEffect, useState } from 'react';

function HatsList() {
  const [hats, setHats] = useState([]);
    const getData = async () => {
      const response = await fetch("http://localhost:8090/api/hats/");

      if (response.ok) {
        const data = await response.json();
        setHats(data.hats);
      }
    };
    useEffect(() => {
    getData();
  }, []);

  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Style Name</th>
          <th>Fabric</th>
          <th>Color</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => {
          return (
            <tr key={hat.id}>
              <td>{hat.style_name}</td>
              <td>{hat.fabric}</td>
              <td>{hat.color}</td>
              <td>{hat.location}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default HatsList;
