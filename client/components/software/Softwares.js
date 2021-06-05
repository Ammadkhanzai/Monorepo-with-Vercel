import Link from 'next/link'

const Softwares = ({ title_yellow ,title , data , link }) => {

  // const address = link.trim().split(" ").join("-").toLowerCase()
  return (
    <div className="softwareBox mb-sm-4">
      <h5 className={title_yellow ? "software_title bg_yellow" : "software_title"} > {title} </h5>
      <ul>
          { data.map((index, key) => (
              <li key={key}>
                <Link  href={`/download/[title]/[id]`} as={`/download/${index.name.trim().split(" ").join("-").toLowerCase()}/${index.key}`}  >
                  <a> 
                  { index.name.toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')+' '+index.version}
                  </a>
                </Link>
              </li>
          ))} 
      </ul>
      <div className="card-footer">
        <p>Top 10 softwares. </p> <Link  href="/software/[category]" as={`/software/${link}`}  >View all</Link>
      </div>
    </div>
  );
};
export default Softwares;
