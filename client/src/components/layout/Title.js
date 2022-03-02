const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: '15px',
    marginBottom: '50px',
  },
})

const Title = (props) => {
  const styles = getStyles()

  return <h1 style={styles.title}>It's all about who you know!</h1>
}

export default Title