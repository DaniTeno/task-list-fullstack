import { createTaskDataValidation, deleteTaskDataValidation, editTaskDataValidation, getTasksDataValidation } from "../../../../utils/dataValidations"
import {
  taskInvalidImportanceType,
  taskInvalidImportanceValue,
  taskValid,
  userValid,
  taskInvalidContentLength,
  userInvalidEmailLengthIdType,
  taskInvalidDocIdType
} from './helpers'

describe('CREATE TASK', () => {

  test('valid data to create', () => {
    const isValidData = createTaskDataValidation(taskValid, userValid)

    expect(isValidData.validate).toBe(true)
  })

  test('invalid task importance type', () => {
    const isValidData = createTaskDataValidation(taskInvalidImportanceType, userValid)

    expect(isValidData).toEqual({ importanceType: false, validate: false })
  })

  test('invalid task importance value', () => {
    const isValidData = createTaskDataValidation(taskInvalidImportanceValue, userValid)

    expect(isValidData).toEqual({ importanceValue: false, validate: false })
  })

  test('invalid user email value and id type', () => {
    const isValidData = createTaskDataValidation(taskValid, userInvalidEmailLengthIdType)

    expect(isValidData).toEqual({ emailLength: false, idType: false, validate: false })
  })

  test('invalid user email value and id type', () => {
    const isValidData = createTaskDataValidation({content: "Pepe"},{id: "123abc"})

    expect(isValidData).toEqual({ validate: false })
  })
})

describe('GET TASKS', () => {
  test('valid user id', () => {
    const isValidData = getTasksDataValidation(userValid)

    expect(isValidData).toEqual({ validate: true })
  })

  test('no user', () => {
    const isValidData = getTasksDataValidation()

    expect(isValidData).toEqual({ validate: false })
  })

  test('invalid user id', () => {
    const isValidData = getTasksDataValidation(userInvalidEmailLengthIdType)

    expect(isValidData).toEqual({ idType: false, validate: false })
  })
})

describe('EDIT TASKS', () => {
  test('no data', () => {
    const isValidData = editTaskDataValidation()

    expect(isValidData).toEqual({ validate: false })
  })

  test('invalid content', () => {
    const isValidData = editTaskDataValidation(taskInvalidContentLength)

    expect(isValidData).toEqual({ contentLength: false, validate: false })
  })

  test('valid data to edit', () => {
    const isValidData = editTaskDataValidation(taskValid)

    expect(isValidData).toEqual({ validate: true })
  })
})

describe('DELETE TASKS', () => {
  test('no data', () => {
    const isValidData = deleteTaskDataValidation()

    expect(isValidData).toEqual({ validate: false })
  })

  test('invalid doc id', () => {
    const isValidData = deleteTaskDataValidation(taskInvalidDocIdType)

    expect(isValidData).toEqual({ idType: false, validate: false })
  })

  test('valid data to delete', () => {
    const isValidData = deleteTaskDataValidation(taskValid)

    expect(isValidData).toEqual({ validate: true })
  })
})