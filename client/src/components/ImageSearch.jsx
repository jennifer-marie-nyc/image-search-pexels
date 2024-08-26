import { useState } from "react"
import axios from "axios"

const ImageSearch = () => {
    const pexelsApiKey = import.meta.env.VITE_API_KEY
    const [searchTerm, setSearchTerm] = useState("")
    const [image, setImage] = useState([])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=1`, {
            headers: {
                Authorization: pexelsApiKey
              }
        })
        .then( res => {
            console.log(res.data.photos[0])
            setImage(res.data.photos[0])
        } )
        .catch( error => {
            console.log(error)
        } )
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="imageSearch">Search for an image</label>
                <input type="text" name="imageSearch" onChange={handleChange}/>
                <input type="submit" value="Search" />
            </form>

            {
                image && (
                    <div>
                        <img src={image.src.medium} alt={image.alt} />
                    </div>
                )
            }
        </>
    )
}

export default ImageSearch