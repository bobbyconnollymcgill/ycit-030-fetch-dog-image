import { useEffect, useState } from "react"

export function App() {
    console.log("rerendering...")

    const [state, setState] = useState(null)

    const fetchDogImage = () => {
        fetch("https://random.dog/woof.json", { method: "GET" })
            .then((response) => {
                console.log(response)

                return response.json()
            })
            .then((data) => {
                console.log(data)

                setState(data)
            })
    }

    useEffect(() => {
        fetchDogImage()
    }, [])

    useEffect(() => {
        if (!state) {
            return
        }
        if (state.fileSizeBytes > 4161408) {
            setState({ error: "image-too-big" })
        }
    }, [state])

    return (
        <div className="App">
            <button
                onClick={() => {
                    fetchDogImage()
                }}
            >
                Get dog image
            </button>
            <div>
                {!!state && !state.error && (
                    <img src={state.url} style={{ width: "300px" }} />
                )}
                {!!state && state.error && <div>{state.error}</div>}
            </div>
        </div>
    )
}
