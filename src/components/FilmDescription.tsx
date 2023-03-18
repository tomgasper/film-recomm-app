type FilmDescriptionProps = {
    desc: string
}


const FilmDescription = ({ desc } : FilmDescriptionProps ) => {
    return (
        <div data-testid="film-summary" className="filmdesc-container">{desc}</div>
    )
}

export default FilmDescription;