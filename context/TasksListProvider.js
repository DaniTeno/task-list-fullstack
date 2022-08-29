import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useUserContext } from '../hooks/useUserContext.js'
import { useFetch } from '../hooks/useFetch.js'
import { getTasksDataValidation } from '../utils/dataValidations.js'

export const tasksContext = createContext()
export const setTaskContext = createContext()
export const isTasksUpdatedContext = createContext()

const FETCH_OPTIONS = (data) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: data.id
    })
  })

const URL = 'http://localhost:3000/api/tasks/read'

export const TaskListProvider = ({ children }) => {
  const [tasksList, setTasksList] = useState(null)
  const [tasksUpdated, setTasksUpdated] = useState(true)
  const user = useUserContext()

  useEffect(() => {
    if (user) {
      useFetch(URL, FETCH_OPTIONS(user)).then(data => setTasksList(data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)))
    }
  }, [user])

  useEffect(() => {
    if(!user) return
    const validData = getTasksDataValidation({id: user.id})
    if (!tasksUpdated && validData.validate) {
      useFetch(URL, FETCH_OPTIONS(user)).then(data => setTasksList(data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)))
      setTasksUpdated(true)
    }
  }, [tasksUpdated, user])

  return (
    <tasksContext.Provider value={tasksList}>
      <setTaskContext.Provider value={setTasksList}>
        <isTasksUpdatedContext.Provider value={setTasksUpdated}>
          {children}
        </isTasksUpdatedContext.Provider>
      </setTaskContext.Provider>
    </tasksContext.Provider>
  )
}