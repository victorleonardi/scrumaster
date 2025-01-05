import { postUser } from "./create"

const router = createRouter()

router.post("/", defineEventHandler(postUser))

export default useBase("/user", router.handler)