
const getGithubCommits = async (req, res) => {
    try {
        const username = "BalasuryaMCA2023"; // GitHub Username
        
        // GitHub Search API for commits by author
        // Using native fetch (available in Node 18+)
        const response = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
            headers: {
                'Accept': 'application/vnd.github.cloak-preview' // Required for Commit Search API
            }
        });

        const data = await response.json();
        
        if (data.total_count !== undefined) {
            res.json({ totalCommits: data.total_count });
        } else {
            console.error("GitHub API Error Trace:", data);
            res.status(500).json({ message: "Failed to fetch GitHub data from GitHub API", error: data });
        }
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getGithubCommits };
