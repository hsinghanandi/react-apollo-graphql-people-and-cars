import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button, Select, InputNumber } from 'antd'

import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const { Option } = Select

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        })
      },
    })
  }

  const getStyles = () => ({
    list: {
      marginBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
    },
  })

  const styles = getStyles()

  return (
    data.people.length > 0 && (
      <>
        <Form
          form={form}
          name="add-car-form"
          layout="inline"
          onFinish={onFinish}
          size="large"
          style={styles.list}
        >
          <Form.Item
            name="year"
            rules={[{ required: true, message: 'Please input car year!' }]}
          >
            <InputNumber min={1990} max={2022} placeholder="Year" />
          </Form.Item>

          <Form.Item
            name="make"
            rules={[{ required: true, message: 'Please input car make!' }]}
          >
            <Input placeholder="Make" />
          </Form.Item>

          <Form.Item
            name="model"
            rules={[{ required: true, message: 'Please input car model!' }]}
          >
            <Input placeholder="Model" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Please input car price!' }]}
          >
            <InputNumber
              min={0}
              step={1.0}
              //   prefix="$"
              style={{ width: '140px' }}
              placeholder="Price"
            />
          </Form.Item>

          <Form.Item
            name="personId"
            rules={[{ required: true, message: 'Pleae select a person!' }]}
          >
            <Select placeholder="Select Person">
              {data.people.map(({ id, firstName, lastName }) => (
                <Option key={id} value={id}>
                  {firstName} {lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Car
              </Button>
            )}
          </Form.Item>
        </Form>
      </>
    )
  )
}

export default AddCar
