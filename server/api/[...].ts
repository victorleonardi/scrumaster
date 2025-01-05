import userEndpoint from './user/[...].ts'

const router = createRouter()

router.use("/user", userEndpoint)

export default useBase("/api/v1", router.handler)