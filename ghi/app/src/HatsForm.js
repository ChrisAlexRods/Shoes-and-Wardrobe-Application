import React, { useState, useEffect } from 'react';

function HatsForm(){

  const [fabric, setFabric] = useState("");
  const [styleName, setstyleName] = useState("");
  const [color, setColor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState('');
  const[url, setUrl] = useState('');
  const [location, setlocation] = useState([]);

  const handleFabricChange = (event) => {
    const value = event.target.value;
    setFabric(value);
  }

  const handleStyleChange = (event) => {
    const value = event.target.value;
    setstyleName(value);
  }

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setUrl(value);
  }

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setSelectedLocation(value);
  }

  const fetchData = async () => {
    const url = "http://localhost:8100/api/locations/"
    const response = await fetch(url);
    if(response.ok){
      const data = await response.json();
      console.log(data)
      setlocation(data.locations);
      console.log(location)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
//This is making the model fields equal to the fields above. Won't work otherwise.
    const data = {};
    data.fabric = fabric;
    data.style_name = styleName;
    data.color = color;
    data.picture_url = url;
    data.location = selectedLocation;
    console.log(data)

    const locationUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok){
      const newLocation = await response.json();
      console.log(newLocation)
      setFabric('');
      setstyleName('')
      setColor('');
      setlocation([])
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Hat</h1>
            <form id="create-hat-form" onSubmit={handleSubmit} >
              <div className="form-floating mb-3">
                <input placeholder="Hat Fabric"  onChange={handleFabricChange} required type="text" name="Hat Fabric" id="Hat Fabric" className="form-control" />
                <label htmlFor="presenter_name">Hat Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="style_name" onChange={handleStyleChange} required type="text" name="style_name" id="style_name" className="form-control" />
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="color" onChange={handleColorChange}  type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="picture_url" onChange={handleUrlChange}  type="url" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Post the Url</label>
              </div>
              <div className="mb-3">
              <select required name="location" id="location" className="form-select" onChange={handleLocationChange} >
                <option  value="">Choose a location</option>
                {location.map(loc => (
                  <option key={loc.href} value={loc.href}>{loc.closet_name}</option>
                ))}
              </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
  )}

  export default HatsForm;