import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const LaunchItem = ({
  launch: { flight_number, mission_name, launch_date_local, launch_success }
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <span className={launch_success ? 'text-success' : 'text-danger'}>
            <h4>{mission_name}</h4>
          </span>
          <h4>{moment(launch_date_local).format('MMM d, YYYY')}</h4>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
