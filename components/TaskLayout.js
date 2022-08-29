import { Build, Delete, Save } from "@mui/icons-material"
import { Button, ButtonGroup, Checkbox, Divider, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useFetch } from "../hooks/useFetch"
import { useIsTasksUpdatedContext } from "../hooks/useTaskContext"
import { theme } from "../styles/MUI/themes"
import { deleteTaskDataValidation, markTaskAsDoneDataValidation } from "../utils/dataValidations"

/*
  Component that display the info and actions of the task like edit and delete a specific task.
  And use a Cloud Function to mark the task as done.
*/

const FETCH_OPTIONS = {
  mark_task_as_done: () => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doneMark: 1
    })
  }),
  delete_task: (docId) => ({
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      docId
    })
  })
}

const URL = {
  mark_task_as_done: (docId) => `http://localhost:5000/cobuild-193ee/us-central1/app/api/tasks/${docId}`,
  delete_task: 'http://localhost:3000/api/tasks/delete'
}

const iconSize = { width: ".9em", height: ".9em" }
const IMPORTANCE_LEVEL = {
  1: theme.status.importance_level.low,
  2: theme.status.importance_level.medium,
  3: theme.status.importance_level.high
}

export const TaskLayout = ({ data, modifyTask, handleModifyTask, handleNewContent, newContent, handleOnChangeContent }) => {
  const { id, doneMark, content, createdAt, importance } = data
  const dateString = new Date(createdAt.seconds * 1000).toLocaleDateString()
  const simpleDate = dateString.split('/').slice(0, 2).join('/')
  const isTaskUpdated = useIsTasksUpdatedContext()

  const deleteTask = async (e) => {
    console.log(e.target.parentNode.dataset.id)
    const id = e.target.dataset.id ?? e.target.parentNode.dataset.id
    const validData = deleteTaskDataValidation({ docId: id })
    if (validData.validate) {
      await useFetch(URL.delete_task, FETCH_OPTIONS.delete_task(id)).then(res => {
        console.log(res)
      })
    }
    isTaskUpdated(false)
  }

  const markTaskAsDone = async (e) => {
    const id = e.target.dataset.id ?? e.target.parentNode.dataset.id
    await useFetch(URL.mark_task_as_done(id), FETCH_OPTIONS.mark_task_as_done()).then(res => {
      console.log(res)
    })
    isTaskUpdated(false)
  }

  return (
    <Box sx={{
      display: 'flex',
      bgcolor: "#eee",
      width: '100%',
    }}>
      <Box width={'.5em'} sx={{
        bgcolor: IMPORTANCE_LEVEL[importance],
        boxShadow: 'inset -2px 0 6px #00000066'
      }}></Box>
      <Box sx={{
        width: "100%",
        color: "#111",
        display: "flex",
        justifyContent: "space-between",
        height: "max-content",
        m: "auto",
        fontSize: "1.1em",
        paddingLeft: "0"
      }}>
        {
          modifyTask.onEdit && id === modifyTask.current
            ? <TextField onChange={handleOnChangeContent} value={newContent} className="task" sx={{
              width: "100%",
              "& input": {
                padding: '.1em .3em'
              }
            }}></TextField>
            : <Box className="task">{content}</Box>
        }
        <Box sx={{
          my: 'auto',
          marginBottom: '3px',
          mx: '.3em',
          fontSize: '.6em',
          color: '#777'
        }}>{simpleDate}</Box>
      </Box>
      <ButtonGroup variant="text">
        <Divider
          orientation="vertical"
          sx={{
            bgcolor: theme.palette.primary.main,
            height: "100%"
          }} />
        <Button data-id={id} disabled={doneMark ? true : false} onClick={markTaskAsDone}>
          <Checkbox data-id={id} checked={doneMark ? true : false} disabled={doneMark ? true : false} sx={iconSize} />
        </Button>
        <Button
          disabled={
            modifyTask.onEdit
              ? id !== modifyTask.current
                ? true
                : false
              : false
          }
          data-id={id}
          size="small"
          onClick={(e) => { handleModifyTask(e); handleNewContent(content) }}
          variant="text"
          sx={{
            position: 'relative',
            zIndex: '10',
            bgcolor: "#eee",
            borderRadius: "0",
            padding: "0",
            width: "min-content",
            ":hover": {
              bgcolor: theme.status.edit
            }
          }}>
          {modifyTask.onEdit && id === modifyTask.current
            ? <Save onClick={(e) => handleModifyTask(newContent)} />
            : <Build data-id={id} />
          }
        </Button>
        <Button
          disabled={modifyTask.onEdit}
          data-id={id}
          onClick={deleteTask}
          size="small"
          variant="text"
          sx={{
            bgcolor: "#eee",
            padding: "0",
            width: "min-content",
            borderRadius: "0",
            ":hover": {
              bgcolor: theme.status.remove
            }
          }}>
          <Delete data-id={id} />
        </Button>
      </ButtonGroup>
    </Box>
  )
}