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

    const handleDelete = async (id) => {
      const url = `http://localhost:8090/api/hats/${id}`
      const fetchConfig = {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json',
          }
      }
      const response = await fetch(url, fetchConfig)
      if (response.ok) {
          getData()
      }
    }

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
          <th>URL</th>
          <th>Location</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => (
            <tr key={hat.id}>
              <td>{hat.style_name}</td>
              <td>{hat.fabric}</td>
              <td>{hat.color}</td>
              <td>{hat.picture_url}</td>
              <td>{hat.location.closet_name}</td>
              <td><button className="btn btn-med btn-primary" onClick={() => handleDelete(hat.id)}>Delete</button></td>
            </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
export default HatsList;
