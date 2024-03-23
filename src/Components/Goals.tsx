// basic display of goals, will become adjustment page, should prob keep goal box consistent between pages
import { ProgressBar } from "react-bootstrap";

const Loading = () => {

    return (
      <>                
          <body>
              <div className="d-flex justify-content-center container align-items-center min-vh-100">
                <div className="card card w-25 mt-5 border border-dark rounded">
                    <div className="card-body">
                            <h3 className="text-center">Goals</h3>
                            <ProgressBar variant="info" now={20} />
                            Cultural References
                            <ProgressBar variant="info" now={70} />
                            Places
                            <ProgressBar variant="info" now={10} />
                            Talking about Food
                            <ProgressBar variant="info" now={40} />
                            Artwork
                    </div>
                </div>
          </div>
        </body>
      </>
    );
  };
  
  export default Loading;
  