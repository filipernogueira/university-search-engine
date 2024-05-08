const UniversityCard = ({ university }) => {

  function getFormattedUrl(url) {
    let formattedUrl = url.replace(/^(https?:\/\/)?/, '');
  
    formattedUrl = formattedUrl.replace(/\/+$/, '');
  
    return formattedUrl;
  }

  return (
    <div className="flex flex-col justify-around w-1/4 h-40 bg-gray-200 rounded-2xl px-5 py-5">
        <span>{university.name}</span>
        <span>{university.alpha_two_code}: {university.country}</span>
        {university.web_pages.map((url, idx) => (
            <a href={url} target="_blank" key={idx}>{getFormattedUrl(url)}</a>
        ))}
    </div>
  )
}

export default UniversityCard