import './styles.css'

export const Typography = ({type, children}) => {
  switch (type) {
    case 'h1':
      return <h1>{children}</h1>
    case 'h4':
      return <h4>{children}</h4>
  }
}
