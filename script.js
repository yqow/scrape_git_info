document.getElementById('username').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {  // Key for the Enter key
        event.preventDefault();  // Prevent the default action to stop any form submission
        fetchGitHubProfile();    // Call the function to fetch and display the GitHub profile
    }
});

function fetchGitHubProfile() {
    const username = document.getElementById('username').value;
    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                const profileHTML = `
                    <h2>${data.name || 'No Name Provided'}</h2>
                    <img src="${data.avatar_url}" alt="GitHub Avatar" width="100">
                    <p><strong>Username:</strong> ${data.login}</p>
                    <p><strong>Bio:</strong> ${data.bio || 'N/A'}</p>
                    <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                    <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
                `;
                document.getElementById('profileDisplay').innerHTML = profileHTML;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('profileDisplay').innerHTML = `<p>User not found. Please check the username and try again.</p>`;
            });
    } else {
        document.getElementById('profileDisplay').innerHTML = `<p>Please enter a username.</p>`;
    }
}
