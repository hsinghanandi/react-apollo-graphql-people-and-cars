import { Card, List } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS } from '../../queries'
import Error from '../listitems/Error'

const styles = {
  personCard: {
    display: 'contents',
  },
  innerCardCars: {
    width: '380px',
    textAlign: 'center',
  },
}

const PersonWithCars = () => {
  let { id } = useParams()
  const userId = String(id)

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: userId },
  })

  console.log('Data', data)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      {data?.personWithCar?.person?.firstName ? (
        <Card
          title={`${data.personWithCar.person.firstName} ${data.personWithCar.person.lastName}`}
          style={styles.personCard}
          extra={<Link to="/">Go Back Home</Link>}
        >
          <List>
            {data.personWithCar.cars.map((car) => (
              <List.Item key={car.id}>
                <Card type="inner" style={styles.innerCardCars}>
                  {car.year} {car.make} {car.model}: ${car.price}
                </Card>
              </List.Item>
            ))}
          </List>
        </Card>
      ) : (
        <Error />
      )}
    </div>
  )
}

export default PersonWithCars
