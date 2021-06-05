import Link from 'next/link'

const Softwares = ({ item }) => {

  return (
    <div className="category_downloads_item" >
        <img src={`http://localhost:5000/uploads/${item.icon}`} alt="icon" />
        <div>
            <h5> 
            <Link href={ `/download/${item.name.trim().split(" ").join("-").toLowerCase()}/${item.key}`} >
                <a>{item.name} {item.version}</a>
            </Link>
            </h5>
            <small>{item.author}</small>
            <p>{item.desc.slice(0, 250)+'...'}</p>
        </div>
    </div>
  );
};
export default Softwares;
