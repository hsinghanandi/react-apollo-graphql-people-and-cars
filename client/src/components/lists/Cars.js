import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_CARS } from '../../queries'
import Car from '../listitems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const Cars = ({ personId, people }) => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const cars = data.cars.filter((car) => car.personId === personId)

  return (
    <List grid={{ gutter: 12, column: 1 }} style={styles.list}>
      {cars.map(
        (car) =>
          car.personId === personId && (
            <List.Item key={car.id}>
              <Car car={car} people={people} />
            </List.Item>
          )
      )}
    </List>
  )
}

export default Cars
