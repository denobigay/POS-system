import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackSuccess: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      <div className="card p-4 bg-secondary text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="mb-3">Thank You for Your Feedback!</h2>
        <p className="mb-4">Your feedback has been successfully submitted. We appreciate your input!</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default FeedbackSuccess; 