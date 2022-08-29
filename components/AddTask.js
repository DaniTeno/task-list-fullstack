import { Avatar, Button, FormControl, Slider, TextField } from "@mui/material"
import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import { useIsTasksUpdatedContext } from "../hooks/useTaskContext"
import { useFetch } from "../hooks/useFetch"
import { Box } from "@mui/system"
import { theme } from "../styles/MUI/themes"
import { createTaskDataValidation } from "../utils/dataValidations"

/**  A component that takes some user info and the content of the text field, 
 *   send a POST request to the http://{domain}/api/tasks/create 
 *   and sets {taskUpdated=false} in "/context/TasksListContext.js"
*/

const FETCH_OPTIONS = (userData, taskData) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: taskData.content,
      importance: taskData.importance,
      userEmail: userData.email,
      userName: userData.nickname,
      userId: userData.id,
    })
  }
}

const URL = 'http://localhost:3000/api/tasks/create'

const SLIDER_IMPORTANCE_MARKS = [
  { value: 0, label: 'L', key: 'low' },
  { value: 1, label: 'M', key: 'medium' },
  { value: 2, label: 'H', key: 'high' }
]

export const AddTask = () => {
  const [taskContent, setTaskContent] = useState({ content: '', importance: 1, key: 'low' })
  const user = useUserContext()
  const isTasksUpdated = useIsTasksUpdatedContext()

  const handleImportance = (e) => {
    const { value } = e.target
    setTaskContent({ ...taskContent, importance: value + 1, key: SLIDER_IMPORTANCE_MARKS[value].key })
  }

  const handleTaskData = (e) => {
    let { value } = e.target
    setTaskContent({ ...taskContent, content: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validData = createTaskDataValidation(taskContent, user)
    if (user && validData.validate) {
      useFetch(URL, FETCH_OPTIONS(user, taskContent)).then(res => {
        console.log(res)
        e.target.reset()
        isTasksUpdated(false)
      })
    }
  }

  const isDisabled = taskContent.content.length === 0 || !user

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: '1',
          bgcolor: '#ddd',
          maxWidth: '800px'
        }}>
        <TextField
          name="task"
          onChange={handleTaskData}
          variant="filled"
          label="Write your task"
          sx={{
            bgcolor: "#fff",
            width: "70%",
            height: "100%",
            outline: "none",
            flexGrow: '1'
          }} />
        <Box sx={{ padding: '0 1em' }}>
          <Slider
            valueLabelDisplay="auto"
            onChange={handleImportance}
            aria-label="Importance"
            size="small"
            defaultValue={0}
            step={null}
            marks={SLIDER_IMPORTANCE_MARKS}
            max={2}
            sx={{
              width: '60px',
              "& span": {
                fontSize: '.6em',
                padding: '.1em .3em',
              },
              "& span[data-index='0'].MuiSlider-thumb": { bgcolor: theme.status.importance_level[taskContent.key] },
              "& span[data-index='0'].MuiSlider-markLabel": { bgcolor: theme.status.importance_level.low, borderRadius: "2px" },
              "& span[data-index='1'].MuiSlider-markLabel": { bgcolor: theme.status.importance_level.medium, borderRadius: "2px" },
              "& span[data-index='2'].MuiSlider-markLabel": { bgcolor: theme.status.importance_level.high, borderRadius: "2px" },
            }}
          />
        </Box>
        <Button
          color="active"
          variant="contained"
          type="submit"
          disabled={isDisabled}
          sx={{
            borderRadius: "0",
            height: "56px"
          }}
        ><Avatar
            src="/add-icon.png"
            variant="square"
            sx={{
              width: "30px",
              height: "30px"
            }} /></Button>
      </FormControl>
    </form>
  )
}