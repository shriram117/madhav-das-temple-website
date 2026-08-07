function TempleInfo({

    templeName,
    setTempleName,

    aboutTemple,
    setAboutTemple,

    logo,
    setLogo,

    banner,
    setBanner,

    oldLogo,
    oldBanner

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">

                    🛕 Temple Information

                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Temple Name

                        </label>

                        <input
                            className="form-control"
                            value={templeName}
                            onChange={(e) =>
                                setTempleName(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Temple Logo

                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) =>
                                setLogo(e.target.files[0])
                            }
                        />

                        {

                            oldLogo && (

                                <img
                                    src={`http://localhost:5000${oldLogo}`}
                                    alt="Logo"
                                    className="img-thumbnail mt-2"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover"
                                    }}
                                />

                            )

                        }

                    </div>

                    <div className="col-md-12 mb-3">

                        <label className="form-label">

                            Temple Banner

                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) =>
                                setBanner(e.target.files[0])
                            }
                        />

                        {

                            oldBanner && (

                                <img
                                    src={`http://localhost:5000${oldBanner}`}
                                    alt="Banner"
                                    className="img-fluid mt-2 rounded border"
                                    style={{
                                        maxHeight: "180px"
                                    }}
                                />

                            )

                        }

                    </div>

                    <div className="col-md-12">

                        <label className="form-label">

                            About Temple

                        </label>

                        <textarea
                            rows="5"
                            className="form-control"
                            value={aboutTemple}
                            onChange={(e) =>
                                setAboutTemple(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TempleInfo;