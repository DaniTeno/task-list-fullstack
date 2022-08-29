import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { useIsTasksUpdatedContext, useSetTaskContext, useTaskContext } from "../hooks/useTaskContext"

const SORTING_KEY = {
  initial: {
    key: 'date', 
    order: 'decreasing'
  },
  increasing: {
    importance: (a, b) => a.importance - b.importance,
    date: (a, b) => a.createdAt.seconds - b.createdAt.seconds,
    length: (a, b) => a.content.length - b.content.length,
    done: (a, b) => a.doneMark - b.doneMark
  },
  decreasing: {
    importance: (a, b) => b.importance - a.importance,
    date: (a, b) => b.createdAt.seconds - a.createdAt.seconds,
    length: (a, b) => b.content.length - a.content.length,
    done: (a, b) => b.doneMark - a.doneMark
  }
}


export const TaskSorter = () => {
  const [sortBy, setSortBy] = useState(SORTING_KEY.initial)
  const setTaskContext = useSetTaskContext()
  const taskContext = useTaskContext()

  const handleSortBy = (e) => {
    const { value } = e.target
    setSortBy({ ...sortBy, key: value })
  }

  const handleAscDesc = (e) => {
    const { value } = e.target
    setSortBy({ ...sortBy, order: value })
  }

  useEffect(() => {
    if (!taskContext) return
    setTaskContext(taskContext.map(el => el).sort(SORTING_KEY[sortBy.order][sortBy.key]))
  }, [sortBy])

  return (
    <Box sx={{
      display: 'flex',
      height: '56px',
      columnGap: '25px',
      justifyContent: 'center'
    }}>
      <Box sx={{ display: 'flex', bgcolor: '#eee', height: 'inherit', alignItems: 'end' }}>
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel id="sort-menu-1">Sort by</InputLabel>
          <Select labelId="sort-menu-1" variant="standard" defaultValue={'date'} onChange={handleSortBy}>
            <MenuItem value={'importance'}>Importance</MenuItem>
            <MenuItem value={'date'}>Date</MenuItem>
            <MenuItem value={'length'}>Length</MenuItem>
            <MenuItem value={'done'}>Done Mark</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', bgcolor: '#eee', height: 'inherit', alignItems: 'end' }}>
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel id="sort-menu-2">Order</InputLabel>
          <Select labelId="sort-menu-2" variant="standard" defaultValue={'decreasing'} onChange={handleAscDesc}>
            <MenuItem value={'increasing'}>Increasing</MenuItem>
            <MenuItem value={'decreasing'}>Decreasing</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}