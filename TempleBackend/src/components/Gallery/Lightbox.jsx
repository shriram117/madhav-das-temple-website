import "./Lightbox.css";

function Lightbox({

    image,

    onClose,

    onNext,

    onPrev

}) {

    if (!image) return null;

    return (

        <div className="lightbox">

            <span

                className="close-btn"

                onClick={onClose}

            >

                &times;

            </span>

            <button

                className="prev-btn"

                onClick={onPrev}

            >

                ❮

            </button>

            <img

                src={image}

                alt="Temple"

                className="lightbox-image"

            />

            <button

                className="next-btn"

                onClick={onNext}

            >

                ❯

            </button>

        </div>

    );

}

export default Lightbox;