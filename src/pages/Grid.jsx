import { useState } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

export default function Grid() {
    const [q, setQ] = useState('')
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const cols = [
        { field: 'id', headerName: 'Id', sortable: true, filter: true },
        { field: 'full_name', headerName: 'Full name', sortable: true, filter: true },
        { field: 'html_url', headerName: 'Html url', sortable: true, filter: true }
    ]

    const search = async () => {
        if (!q.trim()) return
        setLoading(true); setError('')
        try {
            const token = import.meta.env.VITE_GH_TOKEN
            const res = await axios.get('https://api.github.com/search/repositories', {
                params: { q: q.trim(), per_page: 20 },
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            setRows(res.data.items || [])
        } catch {
            setRows([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page">
            <h3>Поиск в гитхабе</h3>

            <div className="controls">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                    placeholder="Введите ключевое слово"
                />
                <button onClick={search} disabled={loading || !q.trim()}>
                    {loading ? 'Loading…' : 'Fetch'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            <div style={{ height: 500, width: 900 }}>
                <AgGridReact
                    theme={themeQuartz}
                    rowData={rows}
                    columnDefs={cols}
                    pagination
                    paginationPageSize={8}
                    paginationPageSizeSelector={[8, 20, 50, 100]}
                />
            </div>
        </div>
    )
}
