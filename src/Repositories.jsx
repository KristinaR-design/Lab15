import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Repositories() {
    const getRepositories = async () => {
        const response = await axios.get(
            'https://api.github.com/search/repositories?q=vite'
        )
        return response.data.items
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ['repositories'],
        queryFn: getRepositories,

        staleTime: 60 * 1000
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error...</p>

    return (
        <table>
            <tbody>
                {data.map((repo) => (
                    <tr key={repo.id}>
                        <td>{repo.full_name}</td>
                        <td>
                            <a href={repo.html_url}>{repo.html_url}</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
