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
    <>
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
        {hats.map(hat => (
            <tr key={hat.id}>
              <td>{hat.style_name}</td>
              <td>{hat.fabric}</td>
              <td>{hat.color}</td>
              <td>{hat.location.closet_name}</td>
            </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
export default HatsList;
