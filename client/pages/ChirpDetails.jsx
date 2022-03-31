import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ChirpDetails = () => {
  const { chirpid } = useParams();
  const [chirp, setChirp] = useState(null);

  useEffect(() => {
    fetch(`api/chirps/${chirp.id}`)
      .then(res => res.json())
      .then(chirp => setChirp(chirp))
  }, []);

  return (
    <main className='container'>
      <section className='row justify-content-center mt-5'>

        <div className='col-md-6' key={chirp?.id}>
        
          <div className='card shadow my-2'>
          {/* <img src={chirp?.movie_banner} className="card-img-top" alt="..." /> */}
            <div className='card-body'>
              <h4 className='card-title'>{chirp?.userid}</h4>
              <p className='card-subtitle text-muted'>{chirp?.location}</p>
              <p className="card-text">{chirp?.content}</p>
              {/* <Link to="/films" className="btn btn-secondary">Go Back</Link> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ChirpDetails;