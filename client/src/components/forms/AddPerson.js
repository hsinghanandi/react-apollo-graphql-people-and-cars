import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
  const [id] = useState(uuidv4())
  const [addPerson] = useMutation(ADD_PERSON)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values) => {
    const { firstName, lastName } = values

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPerson: {
          __typename: 'Person',
          id,
          firstName,
          lastName,
        },
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE })
        proxy.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
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
    <>
      <Form
        form={form}
        name="add-person-form"
        onFinish={onFinish}
        layout="inline"
        size="large"
        style={styles.list}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder="i.e. John" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder="i.e. Smith" />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddPerson
