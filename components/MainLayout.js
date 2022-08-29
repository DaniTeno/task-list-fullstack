import { Avatar, Box, List } from "@mui/material"
import { useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch.js"
import { useIsTasksUpdatedContext, useTaskContext } from "../hooks/useTaskContext.js"
import { useUserContext } from "../hooks/useUserContext.js"
import { theme } from "../styles/MUI/themes.js"
import { editTaskDataValidation } from "../utils/dataValidations.js"
import { AddTask } from "./AddTask.js"
import { TaskLayout } from "./TaskLayout"
import { TaskSorter } from "./TaskSorter"

/** 
*  Component that renders the task list data from the {taskList} 
*  from "/context/taskListContext" if there is a user logged in
*/

const FETCH_OPTIONS = (content, docId) => ({
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content,
    docId
  })
})

const URL = 'http://localhost:3000/api/tasks/edit'

export const MainLayout = () => {
  const [tasks, setTasks] = useState(null)
  const [modifyTask, setModifyTask] = useState({ onEdit: false, current: '' })
  const [newContent, setNewContent] = useState('')
  const taskList = useTaskContext()
  const isTasksUpdated = useIsTasksUpdatedContext()
  const user = useUserContext()

  const handleModifyTask = (e) => {
    if (!modifyTask.onEdit) {
      setModifyTask({ onEdit: true, current: e.target.dataset.id ?? e.target.parentNode.dataset.id })
    }
    if (modifyTask.onEdit) {
      setModifyTask({ ...modifyTask, current: '' })
      const validData = editTaskDataValidation({ content: newContent, docId: modifyTask.current })
      if (validData.validate)
        useFetch(URL, FETCH_OPTIONS(newContent, modifyTask.current))
      setModifyTask({ ...modifyTask, onEdit: false })
      isTasksUpdated(false)
    }
  }

  const handleNewContent = (content) => {
    setNewContent(content)
  }

  const handleOnChangeContent = (e) => {
    setNewContent(e.target.value)
  }

  useEffect(() => {
    if (!user || !taskList) return
    setTasks(taskList)
  }, [user, taskList])

  return (
    <Box sx={{}}>
      <Box sx={{
        width: "100%",
        p: "1em",
        bgcolor: "#1a2f41",
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        rowGap: '20px',
        columnGap: '25px'
      }}>
        <AddTask />
        <TaskSorter />
      </Box>
      {user
        ? !tasks
          ? <Box sx={{
            bgcolor: "#ddd",
            color: '#666',
            fontSize: '2.2em',
            fontStyle: 'italic',
            textAlign: 'center',
            width: '100%',
            py: '.3em'
          }}><Avatar variant="rounded" src="/spinning-circles.svg"
            sx={{
              width: '120px',
              height: '120px',
              bgcolor: theme.palette.primary.main,
              padding: '1em',
              margin: 'auto'
            }} />
          </Box>
          : <List sx={{
            width: '97%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px'
          }}>
            {taskList.length !== 0
              ? tasks.map((data) => <TaskLayout
                data={data}
                key={data.id}
                modifyTask={modifyTask}
                handleModifyTask={handleModifyTask}
                handleNewContent={handleNewContent}
                handleOnChangeContent={handleOnChangeContent}
                newContent={newContent}
              />)
              : <Box sx={{
                bgcolor: "#ddd",
                color: '#666',
                fontSize: '2.2em',
                fontStyle: 'italic',
                textAlign: 'center',
                width: '100%',
                py: '.3em'
              }}>List some tasks...</Box>
            }
          </List>
        : <Box sx={{
          bgcolor: "#ddd",
          color: '#666',
          fontSize: '2.2em',
          fontStyle: 'italic',
          textAlign: 'center',
          width: '100%',
          py: '.3em'
        }}>You need to be logged in...</Box>
      }
    </Box>
  )
}