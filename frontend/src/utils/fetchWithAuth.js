export default  async function fetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem('accessToken');
    options.credentials = 'include';
    // Attach the Authorization header
    options.headers = {
      ...options.headers,
      authorization: `Bearer ${accessToken}`,
    };
  
    const response = await fetch(url, options);
  
    if (response.status === 403) {
      // Token expired, try to refresh
      const refreshResponse = await fetch('https://curved-jeniffer/meridukan/api/user/refreshtoken', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });
  
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        console.log(data)
        accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
  
        // Retry the original request with the new token
        options.headers.authorization = `Bearer ${accessToken}`;
        return fetch(url, options);
      }else {
        // Handle refresh failure (e.g., log out the user)
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        localStorage.removeItem("authenticated")
        throw new Error('Unauthorized');
      }
    }
  
    return response;
  }


  
  