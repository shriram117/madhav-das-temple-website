function ContactInfo({

    address,
    setAddress,

    city,
    setCity,

    state,
    setState,

    pincode,
    setPincode,

    mobileNo,
    setMobileNo,

    whatsappNo,
    setWhatsappNo,

    email,
    setEmail

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-success text-white">

                <h5 className="mb-0">
                    📍 Contact Information
                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-12 mb-3">

                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            rows="3"
                            className="form-control"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            City
                        </label>

                        <input
                            className="form-control"
                            value={city}
                            onChange={(e) =>
                                setCity(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            State
                        </label>

                        <input
                            className="form-control"
                            value={state}
                            onChange={(e) =>
                                setState(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            Pincode
                        </label>

                        <input
                            className="form-control"
                            value={pincode}
                            onChange={(e) =>
                                setPincode(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            Mobile Number
                        </label>

                        <input
                            className="form-control"
                            value={mobileNo}
                            onChange={(e) =>
                                setMobileNo(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            WhatsApp Number
                        </label>

                        <input
                            className="form-control"
                            value={whatsappNo}
                            onChange={(e) =>
                                setWhatsappNo(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-4 mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ContactInfo;