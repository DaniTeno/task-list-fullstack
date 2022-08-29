import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { DB } from '../../../firebase/client'

export default async function handle(req, res) {
  if (req.method === 'GET') return res.status(401).send('ERROR_403: BAD_REQUEST')
  const { data } = req.body
  try {
    const q = doc(DB, "users", data.id);
    const user = await getDoc(q)
    if (user.exists()) {
      return res.status(200).json({ data: user.data() })
    }
    else {
      await setDoc(doc(collection(DB, "users"), data.id), {
        id: data.id,
        nickname: data.nickname,
        name: data.name,
        email: data.email,
        picture: data.picture,
        createdAt: Timestamp.fromDate(new Date())
      })
      
      return res.status(204).json()
    }
  } catch (error) {
    return res.status(500).json({ ...error, message: 'Something went wrong' })
  }
}