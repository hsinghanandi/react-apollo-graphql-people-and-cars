import { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'

const getStyles = (props) => ({
  card: {
    width: '350px',
    border: '1px solid black',
  },
})

const Car = ({ car, people }) => {
  const [year, setYear] = useState(car.year)
  const [make, setMake] = useState(car.make)
  const [model, setModel] = useState(car.model)
  const [price, setPrice] = useState(car.price)
  const [personId, setPersonId] = useState(car.personId)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar
          car={car}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
          people={people}
        />
      ) : (
        <Card
          type="inner"
          key={car.id}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              id={car.id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
        >
          {car.year} {car.make} {car.model}: ${car.price}
        </Card>
      )}
    </div>
  )
}

export default Car
