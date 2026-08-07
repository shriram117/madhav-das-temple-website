function LiveDarshan({

    googleMap,
    setGoogleMap,

    liveDarshanUrl,
    setLiveDarshanUrl

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-danger text-white">

                <h5 className="mb-0">
                    📺 Live Darshan
                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-12 mb-3">

                        <label className="form-label">
                            Google Map Embed Code
                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            value={googleMap}
                            onChange={(e) =>
                                setGoogleMap(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label className="form-label">
                            Live Darshan URL
                        </label>

                        <input
                            className="form-control"
                            placeholder="https://youtube.com/live/..."
                            value={liveDarshanUrl}
                            onChange={(e) =>
                                setLiveDarshanUrl(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LiveDarshan;