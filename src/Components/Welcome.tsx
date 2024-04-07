const Welcome = () => {
  return (
    <>
      <div className="container text-center">
        <p className="fs-6 mt-5 mb-0">Welcome To</p>
        <p className="fs-1 fw-bold text-primary">PenPals!</p>
        <div className="d-flex justify-content-center">
          <a className="btn btn-primary mx-3" href={"/login"}>
            Login
          </a>
          <br></br>
          <a className="btn btn-primary mx-3" href={"/signUp"}>
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
};

export default Welcome;
