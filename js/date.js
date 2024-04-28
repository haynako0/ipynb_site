async function fetchLastUpdatedDate() {
    try {
        const response = await fetch('https://api.github.com/repos/haynako0/ipynb_site/deployments', {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
            const lastDeployment = data[0];
            const lastUpdatedDate = lastDeployment.updated_at;
            return lastUpdatedDate;
        } else {
            throw new Error('No deployments found');
        }
    } catch (error) {
        console.error("Error fetching last updated date:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const lastUpdatedElement = document.getElementById("last-updated");

    const lastUpdatedDate = await fetchLastUpdatedDate();
    if (lastUpdatedDate) {
        const formattedDate = new Date(lastUpdatedDate).toLocaleString();
        lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
    } else {
        lastUpdatedElement.textContent = "Last updated date not available";
    }
});