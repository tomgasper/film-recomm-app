const CardHeader = ( { title } : { title : string } ) => {
    return (
        <div data-testid="film-title" className="filmtitle" >{title}</div>
    )
}

export default CardHeader;