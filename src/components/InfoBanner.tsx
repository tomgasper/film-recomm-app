const InfoBanner = ({ msg } : {msg : string}  ) =>
{
    return (
        <div className="info-banner-container">
            <div className="info-banner">{msg}</div>
        </div>   
    )
}

export default InfoBanner;