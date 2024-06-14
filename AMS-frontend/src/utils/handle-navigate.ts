import { useNavigate } from 'react-router-dom';

// Utility function to handle navigation based on Axios response
const handleNavigationToLogin = () => {
  const navigate = useNavigate(); // Use navigate hook
    localStorage.clear(); // Clear any stored tokens or user data
    navigate("/login"); // Redirect to the login page

};

export default handleNavigationToLogin;
