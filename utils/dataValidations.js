// the validations could be functions in a dictionary (refactor if can afford it)

export const getTasksDataValidation = (userData) => {
  let result = {}
  try {
    if (typeof userData.id != 'string') result = { ...result, idType: false }
    if (userData.id.length <= 0) result = { ...result, idLength: false }

    return (Object.values(result).findIndex(el => el === false) !== -1)
      ? result = { ...result, validate: false }
      : result = { validate: true }

  } catch (error) {
    return result = { validate: false }
  }
}

export const createTaskDataValidation = (taskData, userData) => {
  let result = {}
  try {
    if (typeof taskData.content != 'string') result = { ...result, contentType: false }
    if (typeof taskData.importance != 'number') result = { ...result, importanceType: false }
    if (taskData.importance > 3 || taskData.importance < 1) result = { ...result, importanceValue: false }
    if (!taskData.content.length) result = { ...result, contentLenght: false }
    if (typeof userData.email != 'string') result = { ...result, emailType: false }
    if (typeof userData.id != 'string') result = { ...result, idType: false }
    if (typeof userData.nickname != 'string') result = { ...result, nicknameType: false }
    if (userData.email.length < 6) result = { ...result, emailLength: false }
    if (userData.id.length <= 0) result = { ...result, idLength: false }
    if (userData.nickname.length <= 0) result = { ...result, nicknameLenght: false }

    return (Object.values(result).findIndex(el => el === false) !== -1)
      ? result = { ...result, validate: false }
      : result = { validate: true }
  } catch (error) {
    return result = { validate: false }
  }
}

export const editTaskDataValidation = (taskData) => {
  let result = {}
  try {
    if (typeof taskData.content != 'string') result = { ...result, contentType: false }
    if (typeof taskData.docId != 'string') result = { ...result, idType: false }
    if (taskData.content.length <= 0) result = { ...result, contentLength: false }
    if (taskData.docId.length <= 0) result = { ...result, idLength: false }

    return (Object.values(result).findIndex(el => el === false) !== -1)
      ? result = { ...result, validate: false }
      : result = { validate: true }
  } catch (error) {
    return result = { validate: false }
  }
}

export const deleteTaskDataValidation = (taskData) => {
  let result = {}
  try {
    if (typeof taskData.docId != 'string') result = { ...result, idType: false }
    if (taskData.docId.length <= 0) result = { ...result, idLength: false }

    return (Object.values(result).findIndex(el => el === false) !== -1)
      ? result = { ...result, validate: false }
      : result = { validate: true }
  } catch (error) {
    return result = { validate: false }
  }
}