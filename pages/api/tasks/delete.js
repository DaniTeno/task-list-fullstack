import { DB } from "../../../firebase/client";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteTaskDataValidation } from "../../../utils/dataValidations";

export default async function deleteTask(req, res) {
  try {
    const { docId } = req.body;
    const validData = deleteTaskDataValidationaValidation({docId})
    if (!validData.validate) return res.status(400).json({ message: 'BAD_DATA_VALUES' })
    if (req.method === 'DELETE') {
      const docRef = doc(DB, "tasks", docId)
      await deleteDoc(docRef)
      res.status(200).json({ message: "doc deleted!" })
    }
  } catch (error) {
    res.status(500).json({ ...error, message: 'Something went wrong' })
  }
}