import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";
import swal from "@sweetalert/with-react";
import { useParams, Link } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chirps, setChirps] = useState([]);

  const { chirpid } = useParams();

  useEffect(() => {
    async function getChirps() {
      try {
        const res = await fetch("/api/chirps");
        const chirpData = await res.json();
        setChirps(chirpData);
      } catch (error) {
        console.log(error);
      }
    }
    getChirps();
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  //   const handleChirpSubmit = (e) => {
  //     e.preventDefault();

  //     const newChirp = {
  //       id: uuidv4(),
  //       username: username,
  //       message: message,
  //       created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  //     };

  //     setChirps([...chirps, newChirp]);
  //   };

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form action="/chirp-submit" method="POST">
            <div className="form-group mb-2">
              <input
                name="name"
                type="text"
                className="form-control mb-1"
                placeholder="User ID number"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <textarea
                name="content"
                className="form-control mb-2"
                aria-label="With textarea"
                placeholder="(280 characters max)"
                value={message}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
              ></textarea>
              <input type="submit" value="chirp it!"></input>
              {/* <button className="btn btn-dark" onClick={handleChirpSubmit}>
                Chirp It!
              </button> */}
            </div>
          </form>
          <section className="row justify-content-center mt-5">
            {chirps.map((chirp) => (
              <div className="col-md-6" key={chirp.id}>
                <div className="card shadow my-2">
                  <div className="card-body">
                    <h4 className="card-title">{chirp.userid}</h4>

                    <p className="card-text">{chirp.content}</p>
                    <p className="card-text-muted">{chirp.location}</p>
                    {/* <a href={`api/chirps/${chirp.id}`} className='btn btn-primary'>More details</a> */}

                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        // DELETE request using fetch with async/await
                        async function deletePost() {
                          await fetch(`api/chirps/${chirp.id}`, {
                            method: "DELETE",
                          });
                          // I can't figure out how to receive a http status response here, but I'm running out of time, so for now it will delete if you refresh the page after.
                        }

                        deletePost();
                      }}
                    >
                      Delete
                    </button>
                    
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        swal({
                          content: {
                            element: "input",
                            attributes: {
                              placeholder: "Type your new chirp",
                              type: "newchirp",
                            },
                          },
                        })}
                      }>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
