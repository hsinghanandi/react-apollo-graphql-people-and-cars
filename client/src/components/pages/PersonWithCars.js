import { Card, List } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS } from '../../queries'
import Error from '../listitems/Error'

const styles = {
  personCard: {
    width: '450px',
    display: 'contents',
  },
  carsList: {
    display: 'flex',
    justifyContent: 'center',
  },
  innerCardCars: {
    width: '380px',
    border: '1px solid',
    textAlign: 'center',
  },
}

const PersonWithCars = () => {
  let { id } = useParams()

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id },
  })
  // const { person, cars } = data.personWithCar

  if (loading) return 'Loading...'
  if (error) return <Error />

  return (
    <div>
      <Card
        title={`${data.personWithCar.person.firstName} ${data.personWithCar.person.lastName}`}
        style={styles.personCard}
        extra={<Link to="/">Go Back Home</Link>}
      >
        <List style={styles.carsList}>
          {data.personWithCar.cars.map((car) => (
            <List.Item key={car.id}>
              <Card type="inner" style={styles.innerCardCars}>
                {car.year} {car.make} {car.model}: ${car.price}
              </Card>
            </List.Item>
          ))}
        </List>
      </Card>
    </div>
  )
}

export default PersonWithCars
