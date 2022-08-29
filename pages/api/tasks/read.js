import { DB } from "../../../firebase/client"
import { collection, query, where, getDocs } from "firebase/firestore";
import { getTasksDataValidation } from "../../../utils/dataValidations";

export default async function getTaskByUserId(req, res) {
  try {
    let data = []
    const { user } = req.body
    const validData = getTasksDataValidation({id: user})
    if (!validData.validate) return res.status(400).json({ message: 'BAD_DATA_VALUES' })
    const q = query(collection(DB, "tasks"), where("userId", "==", user));
    const fetchingDocs = await getDocs(q)

    fetchingDocs.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }]
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ ...error, message: 'Something went wrong' })
  }
} 