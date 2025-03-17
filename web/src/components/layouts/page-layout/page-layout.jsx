function PageLayout({ children, className="" }) {
  return (
    <div className={`${className} px-16 pt-10`}>{ children }</div>
  )
}

export default PageLayout