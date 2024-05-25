import React from "react";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <h3 className=" my-3 d-flex justify-content-center">Dashboard</h3>
      <div className="row">
        <div className="col-md-3 mt-4">
          <div className="card border border-primary">
            <div className="card-header">
              <p className="text-primary font-weight-bold">Admin</p>
            </div>
            <div className="card-body">
              <p className="display-4 text-muted">1</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-4">
          <div className="card border border-primary">
            <div className="card-header">
              <p className="text-primary font-weight-bold">User</p>
            </div>
            <div className="card-body">
              <p className="display-4 text-muted">5</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-4">
          <div className="card border border-primary">
            <div className="card-header">
              <p className="text-primary font-weight-bold">Blogs</p>
            </div>
            <div className="card-body">
              <p className="display-4 text-muted">26</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-4">
          <div className="card border border-primary">
            <div className="card-header">
              <p className="text-primary font-weight-bold">Videos</p>
            </div>
            <div className="card-body">
              <p className="display-4 text-muted">26</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
