export default function Userpage({params}:any) {

  return (
      <div>
        <h1>page</h1>
        {/* <hr/> */}
        <p>userpage
            <span>
                {params.id}
            </span>
        </p>
    </div>
  )
}
