import { DB } from "../../../firebase/client";
import { updateDoc, doc } from "firebase/firestore";
import { editTaskDataValidation } from "../../../utils/dataValidations";

export default async function editTask(req, res) {
  try {
    const { content, docId } = req.body;
    const taskData = { content, docId }
    const validData = editTaskDataValidation(taskData)
    if (!validData.validate) return res.status(400).json({ message: 'BAD_DATA_VALUES' })
    if (req.method === 'PUT') {
      const docRef = doc(DB, "tasks", docId)
      await updateDoc(docRef, {
        content
      })
      res.status(204).json({message: 'doc updated'})
    }
  } catch (error) {
    res.status(500).json({ ...error, message: 'Something went wrong' })
  }
}
