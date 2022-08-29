import { addDoc, collection, Timestamp } from "firebase/firestore"
import { DB } from "../../../firebase/client"
import { createTaskDataValidation } from "../../../utils/dataValidations"

export default async function postTask(req, res) {
  try {
    const { content, userEmail, userName, userId, importance } = req.body
    const taskData = { content, importance }
    const userData = { email: userEmail, id: userId, nickname: userName }
    const validData = createTaskDataValidation(taskData, userData)
    if (!validData.validate) return res.status(400).json({ message: 'BAD_DATA_VALUES' })
    const createTask = await addDoc(collection(DB, 'tasks'), {
      content,
      userEmail,
      userName,
      userId,
      importance,
      createdAt: Timestamp.fromDate(new Date()),
      doneMark: 0
    }).then()
    return res.status(200).json({ message: `Document written with ID: ${createTask.id}`, statusCode: 200 })
  } catch (error) {
    res.status(500).json({ ...error, message: 'Something went wrong' })
  }
}