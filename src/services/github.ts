export async function getGitHubStats(username: string) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('GitHub API 호출 중 오류:', error);
      return { publicRepos: 0, followers: 0 };
    }
  }