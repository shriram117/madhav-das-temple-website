function SocialMedia({

    website,
    setWebsite,

    facebookUrl,
    setFacebookUrl,

    instagramUrl,
    setInstagramUrl,

    youtubeUrl,
    setYoutubeUrl

}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-info text-white">

                <h5 className="mb-0">
                    🌐 Social Media
                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Website
                        </label>

                        <input
                            className="form-control"
                            placeholder="https://example.com"
                            value={website}
                            onChange={(e) =>
                                setWebsite(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Facebook
                        </label>

                        <input
                            className="form-control"
                            placeholder="Facebook URL"
                            value={facebookUrl}
                            onChange={(e) =>
                                setFacebookUrl(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Instagram
                        </label>

                        <input
                            className="form-control"
                            placeholder="Instagram URL"
                            value={instagramUrl}
                            onChange={(e) =>
                                setInstagramUrl(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            YouTube
                        </label>

                        <input
                            className="form-control"
                            placeholder="YouTube URL"
                            value={youtubeUrl}
                            onChange={(e) =>
                                setYoutubeUrl(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SocialMedia;