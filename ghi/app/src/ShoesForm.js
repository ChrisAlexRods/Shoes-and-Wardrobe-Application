import React, {useEffect, useState } from 'react';

function ShoesForm() {

    const [bins, setBins] = useState([])

    const [formData, setFormData] = useState({
        manufacturer: '',
        model_name: '',
        color: '',
        picture_url: '',
        bin: '',
      })
    //   console.log(formData)

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
            // console.log(bins)
        }

    }

    useEffect(() => {
    fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8080/api/shoes/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            setFormData({
                manufacturer: '',
                model_name: '',
                color: '',
                picture_url: '',
                bin: '',
            })
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    // CSS classes for rendering
    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (bins.length > 0) {
    spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    dropdownClasses = 'form-select';
    }

    // let messageClasses = 'alert alert-success d-none mb-0';
    // let formClasses = '';
    // if (hasSignedUp) {
    // messageClasses = 'alert alert-success mb-0';
    // formClasses = 'd-none';
    // }

    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-body">
                        {/* <form className={formClasses} onSubmit={handleSubmit} id="create-shoe-form"> */}
                        <form onSubmit={handleSubmit} id="create-shoe-form">
                            <h1 className="card-title">Let's Organize Your Kicks!</h1>
                            <p className="mb-3">
                                Please choose where you'd
                                like to keep your shoes.
                            </p>
                            <div className={spinnerClasses} id="loading-bin-spinner">
                                <div className="spinner-grow text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.bin} name="bin" id="bin" className={`${dropdownClasses} form-select`} required>
                                    <option value="">Choose a bin</option>
                                    {bins.map(bin => {
                                    return (
                                        <option key={bin.href} value={bin.href}>{bin.closet_name}</option>
                                    )
                                    })}
                                </select>
                            </div>
                            <p className="mb-3">
                                Now, tell us about your footwear.
                            </p>
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.manufacturer} required placeholder="Manufacturer" type="text" id="manufacturer" name="manufacturer" className="form-control" />
                                        <label htmlFor="manufacturer">Manufacturer</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.model_name} required placeholder="Model Name" type="text" id="model_name" name="model_name" className="form-control" />
                                        <label htmlFor="model_name">Model Name</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.color} required placeholder="Color" type="text" id="color" name="color" className="form-control" />
                                        <label htmlFor="color">Color</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} value={formData.picture_url} required placeholder="Picture URL" type="url" id="picture_url" name="picture_url" className="form-control" />
                                        <label htmlFor="picture_url">Picture URL</label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-lg btn-primary">Submit</button>
                        </form>
                        {/* <div className={messageClasses} id="success-message">
                            Congratulations! You're one step closer to wardrobe joy!
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoesForm;
