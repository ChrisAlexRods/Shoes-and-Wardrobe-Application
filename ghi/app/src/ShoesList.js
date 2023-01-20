import { useEffect, useState } from 'react';

function ShoesList() {
  const [shoes, setShoes] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/shoes/');

    if (response.ok) {
      const data = await response.json();
      setShoes(data.shoes)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Manufacturer</th>
                <th>Model Name</th>
                <th>Color</th>
                <th>bin</th>
                <th>picture_url</th>
                {/* <th>Delete</th> */}
            </tr>
            </thead>
            <tbody>
            {shoes.map(shoe => {
                return (
                <tr key={shoe.id}>
                    <td>{ shoe.manufacturer }</td>
                    <td>{ shoe.model_name }</td>
                    <td>{ shoe.color }</td>
                    <td>{ shoe.bin }</td>
                    <td>{ shoe.picture_url }</td>
                    {/* <td><button onClick={() => this.delete(shoe.id)}>Delete</button></td> */}
                </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default ShoesList;
